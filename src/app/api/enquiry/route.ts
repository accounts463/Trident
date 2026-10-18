import { enquirySchema } from "@/lib/schemas";
import { handleLead } from "@/lib/server/handle-lead";

export async function POST(request: Request) {
  return handleLead(request, "enquiry", enquirySchema);
}
