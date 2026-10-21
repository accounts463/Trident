"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type Ref, type RefObject } from "react";
import { cn } from "@/lib/cn";

export type DropdownOption<T extends string = string> = { value: T; label: string; hint?: string };

type A11yProps = {
  id: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

const trigger =
  "flex w-full items-center rounded-lg border border-line bg-white px-4 py-3 text-left text-base text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-canvas aria-invalid:border-danger aria-invalid:ring-danger/15";

const panel =
  "absolute inset-x-0 z-50 max-h-72 overflow-y-auto overscroll-contain rounded-lg border border-line bg-white p-1.5 shadow-card-hover";

function normalize<T extends string>(options: readonly (T | DropdownOption<T>)[]): DropdownOption<T>[] {
  return options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
}

/** True when there isn't room below the trigger, so the panel should open upward. */
function opensUp(anchor: HTMLElement | null) {
  if (!anchor) return false;
  const rect = anchor.getBoundingClientRect();
  const below = window.innerHeight - rect.bottom;
  return below < 300 && rect.top > below;
}

/** Keeps the highlighted option visible while moving through a scrolling list. */
function useScrollIntoView(open: boolean, listRef: RefObject<HTMLElement | null>, active: number) {
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listRef]);
}

function OptionRow({ option, selected }: { option: DropdownOption; selected: boolean }) {
  return (
    <>
      <span className="min-w-0 flex-1">
        <span className={cn("block", selected && "font-semibold text-navy")}>{option.label}</span>
        {option.hint && <span className="block text-xs text-muted">{option.hint}</span>}
      </span>
      <Check className={cn("size-4 shrink-0 text-primary", !selected && "invisible")} aria-hidden />
    </>
  );
}

const optionClass = (active: boolean, selected: boolean) =>
  cn(
    "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink",
    active ? "bg-tint" : selected ? "bg-canvas" : "",
  );

type SelectProps<T extends string> = A11yProps & {
  options: readonly (T | DropdownOption<T>)[];
  value?: T | "";
  onChange: (value: T) => void;
  onBlur?: () => void;
  placeholder?: string;
  ref?: Ref<HTMLButtonElement>;
};

/**
 * Select-only combobox (WAI-ARIA APG pattern). Focus stays on the trigger and
 * the highlighted option is exposed through aria-activedescendant.
 */
export function Select<T extends string>({
  id,
  options: rawOptions,
  value,
  onChange,
  onBlur,
  placeholder = "Select an option",
  className,
  ref,
  ...rest
}: SelectProps<T>) {
  const options = useMemo(() => normalize(rawOptions), [rawOptions]);
  const listId = `${useId()}-list`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const typed = useRef({ text: "", timer: 0 });
  const [up, setUp] = useState(false);
  useScrollIntoView(open, listRef, active);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  function show(index = selectedIndex >= 0 ? selectedIndex : 0) {
    setActive(index);
    setUp(opensUp(wrapRef.current));
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  }

  // Jump to the next option starting with the typed characters, like a native select.
  function typeahead(char: string) {
    window.clearTimeout(typed.current.timer);
    typed.current.text += char.toLowerCase();
    typed.current.timer = window.setTimeout(() => (typed.current.text = ""), 500);
    const text = typed.current.text;
    const start = text.length === 1 ? active + 1 : Math.max(active, 0);
    const ordered = [...options.slice(start), ...options.slice(0, start)];
    const match = ordered.find((o) => o.label.toLowerCase().startsWith(text));
    if (!match) return;
    const index = options.indexOf(match);
    if (open) setActive(index);
    else show(index);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        show(e.key === "Home" ? 0 : last);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        typeahead(e.key);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (e.altKey) choose(active);
        else setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
      case "PageUp":
        e.preventDefault();
        setActive(e.key === "Home" ? 0 : (i) => Math.max(i - 10, 0));
        break;
      case "End":
      case "PageDown":
        e.preventDefault();
        setActive(e.key === "End" ? last : (i) => Math.min(i + 10, last));
        break;
      case "Enter":
      case " ":
        if (e.key === " " && typed.current.text) return typeahead(" ");
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        break;
      case "Tab":
        choose(active);
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) typeahead(e.key);
    }
  }

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <button
        ref={ref}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        className={cn(trigger, "gap-3 pr-3")}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        onBlur={() => {
          setOpen(false);
          onBlur?.();
        }}
        {...rest}
      >
        <span className={cn("min-w-0 flex-1 truncate", !selected && "text-muted/70")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-primary transition-transform", open && "rotate-180")}
          strokeWidth={2.25}
          aria-hidden
        />
      </button>
      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={id}
        tabIndex={-1}
        hidden={!open}
        className={cn(panel, up ? "bottom-full mb-2" : "top-full mt-2")}
        // Keep focus on the trigger so blur only fires when leaving the control.
        onMouseDown={(e) => e.preventDefault()}
      >
        {options.map((option, i) => (
          <li
            key={option.value}
            id={`${listId}-${i}`}
            data-index={i}
            role="option"
            aria-selected={i === selectedIndex}
            className={optionClass(i === active, i === selectedIndex)}
            onMouseMove={() => active !== i && setActive(i)}
            onClick={() => choose(i)}
          >
            <OptionRow option={option} selected={i === selectedIndex} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type ComboboxProps = A11yProps & {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  autoComplete?: string;
  ref?: Ref<HTMLInputElement>;
};

/** Free-text input with a filtered suggestion list (replaces <datalist>). */
export function Combobox({
  id,
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  autoComplete = "off",
  ref,
  ...rest
}: ComboboxProps) {
  const listId = `${useId()}-list`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [up, setUp] = useState(false);
  useScrollIntoView(open, listRef, active);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q || options.some((o) => o.toLowerCase() === q)) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, value]);
  const expanded = open && matches.length > 0;

  function openList() {
    setUp(opensUp(wrapRef.current));
    setOpen(true);
  }

  function choose(option: string) {
    onChange(option);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const last = matches.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!expanded) {
          openList();
          setActive(0);
        } else setActive((i) => Math.min(i + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!expanded) {
          openList();
          setActive(last);
        } else setActive((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        if (expanded && active >= 0) {
          e.preventDefault();
          // Don't let the form treat this Enter as "next step" or submit.
          e.stopPropagation();
          choose(matches[active]);
        }
        break;
      case "Escape":
        if (expanded) {
          e.preventDefault();
          e.stopPropagation();
          setOpen(false);
        }
        break;
    }
  }

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <input
        ref={ref}
        id={id}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-activedescendant={expanded && active >= 0 ? `${listId}-${active}` : undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        className={cn(trigger, "pr-11 placeholder:text-muted/70")}
        onChange={(e) => {
          onChange(e.target.value);
          if (!open) openList();
          setActive(-1);
        }}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onBlur={() => {
          setOpen(false);
          onBlur?.();
        }}
        {...rest}
      />
      <ChevronDown
        className={cn(
          "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-primary transition-transform",
          expanded && "rotate-180",
        )}
        strokeWidth={2.25}
        aria-hidden
      />
      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={id}
        tabIndex={-1}
        hidden={!expanded}
        className={cn(panel, up ? "bottom-full mb-2" : "top-full mt-2")}
        onMouseDown={(e) => e.preventDefault()}
      >
        {matches.map((option, i) => (
          <li
            key={option}
            id={`${listId}-${i}`}
            data-index={i}
            role="option"
            aria-selected={i === active}
            className={optionClass(i === active, option === value)}
            onMouseMove={() => active !== i && setActive(i)}
            onClick={() => choose(option)}
          >
            <OptionRow option={{ value: option, label: option }} selected={option === value} />
          </li>
        ))}
      </ul>
    </div>
  );
}
