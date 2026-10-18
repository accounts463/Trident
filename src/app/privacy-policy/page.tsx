import { company } from "@/content/company";
import { LegalPage } from "@/components/sections/LegalPage";
import { getContact } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses and protects personal information submitted through this website.`,
  path: "/privacy-policy",
});

// TODO: have this policy reviewed by Trident Core Energy's legal advisor (including
// obligations under India's Digital Personal Data Protection Act) before launch.
export default function PrivacyPolicyPage() {
  const contact = getContact();
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy">
      <p>
        This policy explains how {company.legalName ?? company.name} (&quot;we&quot;, &quot;us&quot;) handles personal
        information collected through this website.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Details you submit in our forms: name, phone number, email, location, property or project type, energy requirements and any message.</li>
        <li>Technical information needed to run and secure the site, such as IP address (used for spam and abuse prevention).</li>
        <li>With your consent only, analytics information about how the site is used.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry or quote request and to discuss your project.</li>
        <li>To prevent spam, fraud and abuse of our forms.</li>
        <li>With your consent, to understand and improve how the website is used.</li>
      </ul>
      <p>We do not sell your personal information.</p>
      <h2>Sharing</h2>
      <p>
        We share information only with service providers that help us operate the website and respond to you (for example
        email delivery, hosting, spam protection and customer relationship management tools), and where required by law.
      </p>
      <h2>Cookies</h2>
      <p>
        Essential cookies and local storage keep the site working and remember your cookie choice. Analytics cookies and
        embedded maps load only if you select &quot;Accept all&quot;. You can change your choice at any time using
        &quot;Cookie settings&quot; in the footer.
      </p>
      <h2>Retention</h2>
      <p>We keep enquiry information only as long as needed to respond to you and for legitimate business records.</p>
      <h2>Your choices</h2>
      <p>You can ask us to access, correct or delete the personal information you have submitted.</p>
      <h2>Contact</h2>
      <p>
        For privacy questions, contact us{contact.email ? <> at <a href={`mailto:${contact.email}`}>{contact.email}</a></> : <> through our <a href="/contact">contact page</a></>}.
      </p>
    </LegalPage>
  );
}
