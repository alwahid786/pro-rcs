export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export const contactSectionContent = {
  title: "Contact Information",
  subtitle: "Let us know you a bit.",
  details: [
    {
      label: "Phone",
      value: "313-960-0888",
      href: "tel:+13139600888",
    },
    {
      label: "Email",
      value: "info@prorcs.com",
      href: "mailto:info@prorcs.com",
    },
    {
      label: "Address",
      value: "330 Town Center Dr, Suite 535, Dearborn, MI 48126",
    },
  ] satisfies ContactDetail[],
  form: {
    firstName: { label: "First Name", placeholder: "" },
    lastName: { label: "Last Name", placeholder: "Doe" },
    email: { label: "Email", placeholder: "" },
    phone: { label: "Phone Number", placeholder: "+1 012 3456 789" },
    message: { label: "Message", placeholder: "Write your message.." },
    submit: "Send Message",
  },
};
