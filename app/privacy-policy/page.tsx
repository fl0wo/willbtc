import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://blogfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata:any = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`
Privacy Policy for BlogFAST
Last Updated: August 25, 2023

Welcome to BlogFAST ("we", "us", or "our"). This Privacy Policy explains how we collect, use, protect, and disclose your information when you use our website located at https://blogfa.st (the "Website") and associated services.

By accessing or using the Website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not access or use the Website.

### 1. Information We Collect

#### 1.1 Personal Data

When you use our Website, we may collect the following personal information:

- Name: Collected to personalize your experience and facilitate communications.
- Email Address: Used to send you information regarding your account, updates, and communications about our services.
- Payment Information: We collect payment details to process transactions. We do not store your payment information; it is handled by trusted third-party payment processors.

#### 1.2 Non-Personal Data

We employ cookies and similar technologies to collect non-personal data that helps us enhance your experience, analyze trends, and administer the Website. This data may include your IP address, browser type, device information, and your browsing activities on our Website.

### 2. Purpose of Data Collection

The personal data we collect is used for:

- Processing and fulfilling your orders.
- Providing customer support and assistance.
- Sending you important updates and communications related to our services.
- Improving and personalizing your experience with our services.

### 3. Data Sharing

We do not share, sell, trade, or rent your personal data to third parties, except as necessary to provide our services (e.g., processing payments). Such sharing is conducted under strict confidentiality agreements.

### 4. Children's Privacy

BlogFAST is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we take steps to remove such information and terminate the child's account.

### 5. Security of Your Information

We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.

### 6. Changes to Our Privacy Policy

We may update this Privacy Policy periodically to reflect changes in our practices. We will notify you of any significant changes by posting the new policy on our Website and updating the "Last Updated" date at the top of this policy.

### 7. Contact Us

If you have any questions or concerns about our Privacy Policy or data processing, or if you would like to make a complaint about a possible breach of local privacy laws, please contact us at:

Email: blogfast1@gmail.com

For all other inquiries, please visit the Contact Us page on our Website.

Your continued use of our Website and services after any changes or revisions to this Privacy Policy will indicate your agreement with the terms of such revised Privacy Policy.
`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
