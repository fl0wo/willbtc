import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://blogfa.st
// - Name: BlogFAST
// - Contact information: info@blogfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://blogfa.st/privacy-policy
// - Governing Law: Estonia
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata:any = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-2xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`
Terms of Use for BlogFAST
Last Updated: 5 May 2024

Welcome to BlogFAST!

These Terms of Service ("Terms") govern your use of the BlogFAST website located at https://blogfa.st ("Website") and the automated blog content generation services provided by BlogFAST ("Services"). By accessing and using our Website and Services, you agree to comply with and be bound by these Terms.

1. Description of BlogFAST

BlogFAST is a platform that offers automated, AI-generated blog content services, helping users generate daily SEO-optimized blogs hosted on custom domains to enhance their web presence and generate leads.

2. Ownership and Usage Rights

Upon subscribing to a service package from BlogFAST, you are granted a license to use the AI-generated content on your specified domain. While you own the final blog content generated through our services, you are not permitted to resell the content or the service itself. All content generated is intended for use under the domain registered with the service.

3. User Data and Privacy

We collect and store necessary user data, including names, email addresses, and payment information, to provide and improve our Services. We commit to protecting your privacy and data according to our Privacy Policy, which can be accessed at https://blogfa.st/privacy-policy.

4. Non-Personal Data Collection

We employ cookies and similar technologies to collect non-personal data to enhance our Services and your user experience. By using our Website, you consent to the use of these technologies as described in our Privacy Policy.

5. Refunds and Cancellations

We offer a satisfaction guarantee with a full refund within 14 days of purchase if you are not satisfied with our Services. Please contact our support team to process a refund.

6. Governing Law

These Terms shall be governed and construed in accordance with the laws of the State of Estonia, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.

7. Changes to the Terms

We reserve the right to modify or replace these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.

8. Contact Us

For any questions or concerns regarding these Terms, please contact us at blogfast1@gmail.com

Thank you for choosing BlogFAST!

          `}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
