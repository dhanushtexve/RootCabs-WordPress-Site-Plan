export type PolicySection = {
  id: string;
  title: string;
  content: string;
};

export type PolicyDocument = {
  key: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  effective: string;
  jurisdiction: string;
  contact: string;
  footer_contact: string;
  nav: Array<{ label: string; slug: string }>;
  intro: string[];
  sections: PolicySection[];
  footer: string;
};

export const policyDocuments = {
  "privacy-policy": {
    "key": "privacy-policy",
    "title": "Privacy Policy",
    "subtitle": "How Root Cabs collects, uses, shares and protects the personal data of Customers, Driver Partners and Vendors.",
    "eyebrow": "A unit of Texve Innovations Private Limited",
    "effective": "Effective 1 August 2026",
    "jurisdiction": "Jurisdiction: Tamil Nadu, India",
    "contact": "privacy@rootcabs.com",
    "footer_contact": "support@rootcabs.com",
    "nav": [
      {
        "label": "Privacy Policy",
        "slug": "privacy-policy"
      },
      {
        "label": "Terms of Service",
        "slug": "terms-of-use"
      },
      {
        "label": "Wallet Policy",
        "slug": "wallet-policy"
      }
    ],
    "intro": [
      "<p>This Privacy Policy (\"Policy\") is published by Texve Innovations Private Limited, operating the transportation, delivery and related technology platform under the brand \"Root Cabs\" (\"Root Cabs\", \"Company\", \"we\", \"us\", \"our\"), and describes how we collect, use, store, share, transfer, retain and protect personal data of individuals who access or use our website, mobile applications (Customer, Driver Partner and Vendor apps), APIs and related services (together, the \"Platform\").</p>",
      "<p>This Policy is framed with reference to the Digital Personal Data Protection Act, 2023 and the Rules made thereunder (\"DPDP Act\"), the Information Technology Act, 2000 and the SPDI Rules, 2011, the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the Motor Vehicle Aggregator Guidelines, 2020, and other applicable Indian laws. Root Cabs is headquartered in Vellore, Tamil Nadu, and this Policy applies consistently across all States and Union Territories in which the Platform operates, with Tamil Nadu courts having jurisdiction as set out in Section 17.</p>"
    ],
    "sections": [
      {
        "id": "scope-and-application",
        "title": "1. Scope and Application",
        "content": "<p>This Policy applies to all individuals who interact with the Platform, including:</p><ul><li>Customers who register, book, or pay for rides, auto trips, drop taxi, outstation trips, acting-driver services or Root Delivery (parcel) bookings;</li><li>Driver Partners, including Cab, Auto, Bike-Taxi, Acting Driver and Parcel Delivery Partners, and applicants;</li><li>Vendors who make vehicles available to Driver Partners on the Platform;</li><li>Visitors to the Root Cabs website who have not created an account;</li><li>Participants in referral programmes, promotions, surveys, contests or customer-support interactions;</li><li>Corporate or bulk-booking clients and their authorised users.</li></ul><p>This Policy covers every service line offered by Root Cabs - Local Rides, Auto, Drop Taxi, Outstation Trips, Acting Driver Services, Root Delivery (Parcel Delivery), Bike Taxi, the Root Cabs Wallet, referral/promotional programmes, and future services - and should be read together with the Root Cabs Terms of Service and Wallet & Customer Money Policy.</p>"
      },
      {
        "id": "definitions",
        "title": "2. Definitions",
        "content": "<p class=\"term\"><strong>\"Personal Data\"</strong> means any data about an individual who is identifiable by or in relation to such data, as defined under the DPDP Act.</p><p class=\"term\"><strong>\"Sensitive Personal Data\"</strong> means financial information, government identifiers (such as Aadhaar or PAN), biometric data and other categories recognised as sensitive under the SPDI Rules.</p><p class=\"term\"><strong>\"Data Principal\"</strong> means the individual to whom the Personal Data relates - the Customer, Driver Partner, Vendor or other User.</p><p class=\"term\"><strong>\"Data Fiduciary\"</strong> means Root Cabs (through Texve Innovations Private Limited), which determines the purpose and means of processing.</p><p class=\"term\"><strong>\"Consent Manager\"</strong> means a person registered with the Data Protection Board who enables a Data Principal to give, manage, review or withdraw consent, where such a mechanism is adopted.</p><p class=\"term\"><strong>\"Processing\"</strong> means any operation performed on Personal Data, including collection, storage, use, sharing, disclosure and erasure.</p><p class=\"term\"><strong>\"Platform\"</strong> means the Root Cabs website, Customer app, Driver Partner app, Vendor portal, APIs and any other digital interface operated by or on behalf of Root Cabs.</p>"
      },
      {
        "id": "our-commitment",
        "title": "3. Our Commitment",
        "content": "<ul><li>We collect only the Personal Data reasonably necessary to provide safe, reliable transportation, delivery and payment-related services.</li><li>We process Personal Data lawfully, fairly and transparently, only for notified purposes.</li><li>We do not sell Personal Data to third parties.</li><li>We maintain reasonable security safeguards appropriate to data sensitivity.</li><li>We honour Data Principal rights under the DPDP Act (Section 13).</li></ul>"
      },
      {
        "id": "information-we-collect",
        "title": "4. Information We Collect",
        "content": "<h3>4.1 Information You Provide Directly</h3><h3>(a) Account and Registration Information</h3><ul><li>Full name, mobile number, e-mail address, date of birth and residential address;</li><li>Profile photograph and account password/authentication credentials;</li><li>Emergency contact details, if provided;</li><li>Referral codes, promotional codes and communication preferences.</li></ul><h3>(b) Driver Partner and Vendor Onboarding Information</h3><ul><li>Driving licence, RC, insurance certificate, permit, fitness certificate and PUC certificate;</li><li>Aadhaar and/or other government ID, and PAN, verified only to the extent permitted under the Aadhaar Act, 2016 and DPDP Act;</li><li>Bank account details, cancelled cheque/bank proof, and GST information, where applicable;</li><li>Vehicle photographs, model, registration number, type and ownership documents;</li><li>Background-verification information, where legally permitted, obtained with consent.</li></ul><h3>(c) Payment and Wallet Information</h3><ul><li>Payment method, transaction identifiers and status, UPI handle, masked card details;</li><li>Root Cabs Wallet balances, promotional credits, referral rewards, refunds, and withdrawal/settlement information.</li><li>Root Cabs does not store full debit/credit card numbers or CVV - these are processed exclusively by our RBI-authorised Payment Aggregator partners under PCI-DSS.</li></ul><h3>(d) Support, Feedback and Content</h3><ul><li>Customer-support tickets, complaint details, chat and call-recording transcripts (where recorded with notice), feedback, ratings and dispute documents;</li><li>Ratings, reviews, survey responses, contest entries and voluntarily uploaded images.</li></ul><h3>4.2 Information Collected Automatically</h3><h3>(a) Location Information</h3><p>Subject to device permissions, we collect real-time GPS location, pickup/drop coordinates, route travelled, driver/customer live location during a trip, and route deviations - used to match Customers with drivers, provide navigation, calculate fares and ETAs, enhance safety, investigate disputes and prevent fraud.</p><h3>(b) Ride and Delivery Information</h3><ul><li>Booking ID, service type, pickup/destination address, date and time, distance and duration, waiting time, cancellation data, fare breakup, tolls, parking, discounts, Wallet deductions and post-trip ratings.</li></ul><h3>(c) Device and Usage Information</h3><ul><li>Device model, OS, device identifiers, IP address, browser type, app version, crash reports, login activity and security events;</li><li>Feature usage, screens viewed, booking frequency, in-app search history, notification interactions and referral activity.</li></ul><h3>(d) App Permissions</h3><p>Root Cabs requests only permissions necessary for the user's role - Location, Notifications, Contacts (emergency-alert/ride-sharing only), Camera and Storage (document/complaint uploads), Phone (in-app calling/support), and OTP auto-fill - requested contextually and withdrawable via device settings.</p><h3>4.3 Information from Third Parties</h3><ul><li>Payment service providers, banking partners and payment aggregators;</li><li>Identity-verification and background-check agencies, vehicle-verification agencies;</li><li>Government and law-enforcement authorities, insurance providers;</li><li>Referral participants, business/corporate partners, analytics and marketing partners.</li></ul>"
      },
      {
        "id": "legal-basis-and-purposes-of-processing",
        "title": "5. Legal Basis and Purposes of Processing",
        "content": "<p>Root Cabs processes Personal Data on the basis of consent (including deemed consent for legitimate uses recognised under the DPDP Act), performance of contract, compliance with legal obligation, or Root Cabs' legitimate interest in operating a safe platform.</p><div class=\"rc-policy-table-wrap\"><table class=\"rc-policy-table\"><thead><tr><th>Purpose</th><th>Examples</th><th>Typical Legal Basis</th></tr></thead><tbody><tr><td>Account creation and authentication</td><td>Verifying identity, OTP login, account recovery</td><td>Contract performance / consent</td></tr><tr><td>Service delivery</td><td>Matching rides, navigation, dispatch, Root Delivery logistics</td><td>Contract performance</td></tr><tr><td>Payments and Wallet</td><td>Fare collection, refunds, settlements, Wallet credits</td><td>Contract performance</td></tr><tr><td>Safety and fraud prevention</td><td>Identity checks, trip monitoring, SOS response, duplicate-account detection</td><td>Legitimate interest / legal obligation</td></tr><tr><td>Customer support</td><td>Resolving complaints, dispute investigation</td><td>Contract performance</td></tr><tr><td>Marketing communications</td><td>Offers, referral campaigns, surveys</td><td>Consent (opt-out available)</td></tr><tr><td>Legal and regulatory compliance</td><td>Tax records, law-enforcement requests, aggregator-licence reporting</td><td>Legal obligation</td></tr><tr><td>Analytics and product improvement</td><td>Aggregated/anonymised usage analysis</td><td>Legitimate interest</td></tr></tbody></table></div>"
      },
      {
        "id": "cookies-and-tracking-technologies",
        "title": "6. Cookies and Tracking Technologies",
        "content": "<p>The Root Cabs website and apps use cookies, SDK-based analytics and similar technologies to remember login sessions, save preferences, maintain security, measure performance, understand behaviour, personalise content and detect fraud. Users may manage cookies through browser settings; disabling cookies may affect certain functionality.</p>"
      },
      {
        "id": "how-we-share-your-information",
        "title": "7. How We Share Your Information",
        "content": "<p>Root Cabs does not sell Personal Data. We share it only as reasonably necessary for the purposes below, subject to contractual confidentiality and security obligations on every recipient.</p><h3>7.1 With Driver Partners / Customers (Trip Facilitation)</h3><p>To facilitate a booking, we share the Customer's name, pickup/drop location and contact number (masked or app-based calling where available) with the assigned Driver Partner; and share the Driver Partner's name, photograph, vehicle details, rating, ETA and live trip location with the Customer.</p><h3>7.2 With Service Providers</h3><ul><li>Payment processors and payment aggregators;</li><li>Cloud hosting and infrastructure providers;</li><li>SMS, e-mail and WhatsApp Business API providers;</li><li>Identity-verification, background-check and mapping/navigation providers;</li><li>Customer-support tooling, analytics and fraud-prevention vendors.</li></ul><h3>7.3 With Government and Law Enforcement</h3><p>We may disclose information to comply with applicable law, a court order, or a lawful request from a government or law-enforcement authority, including under the Motor Vehicle Aggregator Guidelines, 2020 and any Tamil Nadu State aggregator scheme, or to protect the safety of any person.</p><h3>7.4 Business Transfers</h3><p>If Root Cabs undergoes a merger, acquisition, restructuring, or sale of assets, Personal Data may be transferred as part of that transaction, subject to the transferee agreeing to protect it consistently with this Policy.</p><h3>7.5 Cross-Border Transfer</h3><p>Root Cabs primarily stores and processes Personal Data within India. Where a service provider processes data outside India, this will occur only to the extent permitted under the DPDP Act and subject to contractual safeguards.</p>"
      },
      {
        "id": "marketing-communications",
        "title": "8. Marketing Communications",
        "content": "<p>With your consent, Root Cabs may send promotional offers, referral campaigns and satisfaction surveys via SMS, e-mail, WhatsApp or push notification. You may opt out at any time through in-app settings, the unsubscribe link, or by writing to privacy@rootcabs.com. Opting out does not affect transactional messages (e.g., OTPs, booking confirmations).</p>"
      },
      {
        "id": "automated-decision-making",
        "title": "9. Automated Decision-Making",
        "content": "<p>Root Cabs uses automated systems for ride matching, ETA and fare calculation, route optimisation, fraud and duplicate-booking detection, and flagging unusual activity for manual review. Where an automated decision has a significant effect on a user, the user may request human review via Root Cabs Support.</p>"
      },
      {
        "id": "data-retention",
        "title": "10. Data Retention",
        "content": "<p>Root Cabs retains Personal Data only as long as necessary, or as required under applicable law, including the Motor Vehicle Aggregator Guidelines, 2020, tax/financial-record requirements, and limitation periods for legal claims.</p><div class=\"rc-policy-table-wrap\"><table class=\"rc-policy-table\"><thead><tr><th>Data Category</th><th>Indicative Retention</th></tr></thead><tbody><tr><td>Ride/trip and booking history</td><td>Duration of account plus the period required under the applicable aggregator scheme and for dispute resolution</td></tr><tr><td>Payment and Wallet transaction records</td><td>As required under financial record-keeping norms, generally not less than the applicable statutory period</td></tr><tr><td>KYC / identity verification documents (Driver Partners)</td><td>Duration of association plus the period mandated for regulatory or tax purposes</td></tr><tr><td>Customer-support communications</td><td>Until resolution and a reasonable period thereafter</td></tr><tr><td>Marketing consent and preference records</td><td>Until consent is withdrawn, plus a reasonable evidentiary period</td></tr></tbody></table></div>"
      },
      {
        "id": "account-and-data-deletion",
        "title": "11. Account and Data Deletion",
        "content": "<p>Customers, Driver Partners and Vendors may request account deletion through the app or by writing to support@rootcabs.com. Before completing deletion, Root Cabs will require that:</p><ul><li>any upcoming or active bookings are closed;</li><li>any withdrawable Wallet balance is settled or withdrawn per the Wallet & Customer Money Policy;</li><li>for Driver Partners and Vendors, pending change requests, verification documents, payout requests and support tickets are resolved.</li></ul><p>Root Cabs will thereafter erase or anonymise Personal Data within a reasonable period, except where retention is required by law, for disputes, fraud prevention, or enforcing our Terms. Deleted accounts and forfeited Wallet balance may not be recoverable.</p>"
      },
      {
        "id": "data-security",
        "title": "12. Data Security",
        "content": "<p>Root Cabs implements reasonable security practices under Section 43A of the IT Act, 2000 and SPDI Rules, including OTP-based authentication, encryption in transit, role-based access controls, secure cloud infrastructure, continuous monitoring, firewalls and periodic security assessments. No method of transmission is completely secure - report suspected unauthorised access to security@rootcabs.com immediately.</p>"
      },
      {
        "id": "your-rights-as-a-data-principal",
        "title": "13. Your Rights as a Data Principal",
        "content": "<p>Subject to the DPDP Act and applicable exemptions, you have the right to:</p><ul><li>obtain a summary of the Personal Data being processed and the processing activities undertaken;</li><li>request correction, completion or updating of your Personal Data;</li><li>request erasure of Personal Data no longer necessary for its collected purpose, subject to legal retention requirements;</li><li>withdraw consent at any time, with prospective effect;</li><li>nominate another individual to exercise these rights on your behalf in the event of death or incapacity;</li><li>grievance redressal, as set out in Section 15.</li></ul><p>Requests may be submitted to privacy@rootcabs.com and will be addressed within DPDP Act timelines. Root Cabs may request reasonable proof of identity before acting on a request.</p>"
      },
      {
        "id": "children-s-data",
        "title": "14. Children's Data",
        "content": "<p>Root Cabs services are intended for individuals at least 18 years old and competent to contract. We do not knowingly collect a child's Personal Data without verifiable parental/guardian consent, and will delete it promptly if inadvertently collected.</p>"
      },
      {
        "id": "grievance-redressal-and-data-protection-contact",
        "title": "15. Grievance Redressal and Data Protection Contact",
        "content": "<p>In accordance with the DPDP Act and IT Rules, 2021, Root Cabs designates the following contact point:</p><div class=\"rc-policy-table-wrap\"><table class=\"rc-policy-table\"><thead><tr><th>Role</th><th>Details</th></tr></thead><tbody><tr><td>Grievance / Data Protection Officer</td><td>To be designated (name and contact to be published on the Platform prior to go-live)</td></tr><tr><td>E-mail</td><td>grievance@rootcabs.com</td></tr><tr><td>Registered Office</td><td>Root Cabs, a unit of Texve Innovations Private Limited, No. 42, 1st Floor, VIT Main Road, Tharapadavedu, Katpadi, Vellore - 632007, Tamil Nadu</td></tr><tr><td>Support helpline</td><td>+91 860 860 2829</td></tr><tr><td>Response timeline</td><td>Acknowledgement within 7 business days; resolution within 30 business days, or as prescribed under the DPDP Rules</td></tr></tbody></table></div><p>If unsatisfied, you may escalate to the Data Protection Board of India, once operational.</p>"
      },
      {
        "id": "third-party-links-and-services",
        "title": "16. Third-Party Links and Services",
        "content": "<p>The Platform may link to or integrate third-party websites, maps, payment gateways or communication tools that maintain their own privacy policies. Root Cabs is not responsible for the privacy practices of such third parties.</p>"
      },
      {
        "id": "changes-to-this-policy-and-governing-law",
        "title": "17. Changes to this Policy and Governing Law",
        "content": "<p>Root Cabs may update this Policy to reflect changes in law, technology or business operations. Material changes will be notified through the app, SMS or e-mail. This Policy is governed by the laws of India, with courts at Vellore/Chennai, Tamil Nadu having exclusive jurisdiction, without prejudice to the arbitration clause in the Terms of Service.</p>"
      },
      {
        "id": "contact-us",
        "title": "18. Contact Us",
        "content": "<p>For any questions about this Privacy Policy, write to privacy@rootcabs.com or contact Root Cabs Support at +91 860 860 2829.</p>"
      }
    ],
    "footer": "Root Cabs - a unit of Texve Innovations Private Limited | No. 42, 1st Floor, VIT Main Road, Tharapadavedu, Katpadi, Vellore - 632007, Tamil Nadu | support@rootcabs.com"
  },
  "terms-of-use": {
    "key": "terms-of-use",
    "title": "Terms of Service",
    "subtitle": "The platform terms that govern every booking, Driver Partner, and Root Cabs service.",
    "eyebrow": "A unit of Texve Innovations Private Limited",
    "effective": "Effective 1 August 2026",
    "jurisdiction": "Jurisdiction: Tamil Nadu, India",
    "contact": "support@rootcabs.com",
    "footer_contact": "support@rootcabs.com",
    "nav": [
      {
        "label": "Privacy Policy",
        "slug": "privacy-policy"
      },
      {
        "label": "Terms of Service",
        "slug": "terms-of-use"
      },
      {
        "label": "Wallet Policy",
        "slug": "wallet-policy"
      }
    ],
    "intro": [
      "<p>Welcome to Root Cabs. These Terms of Service (\"Terms\") govern access to and use of the website, mobile applications and related services (together, the \"Platform\") operated by Texve Innovations Private Limited under the brand \"Root Cabs\" (\"Root Cabs\", \"Company\", \"we\", \"us\", \"our\"). By registering on, accessing, or using the Platform - whether as a Customer, Driver Partner, Vendor, or visitor - you agree to be bound by these Terms, the Root Cabs Privacy Policy, and the Root Cabs Wallet & Customer Money Policy, each incorporated by reference. If you do not agree, please discontinue use of the Platform.</p>"
    ],
    "sections": [
      {
        "id": "definitions",
        "title": "1. Definitions",
        "content": "<p class=\"term\"><strong>\"Account\"</strong> means the registered profile of a Customer, Driver Partner or Vendor on the Platform.</p><p class=\"term\"><strong>\"Customer\"</strong> means an individual who books a Ride, Auto trip, Drop Taxi, Outstation trip, Acting Driver service, or Root Delivery consignment through the Platform.</p><p class=\"term\"><strong>\"Driver Partner\"</strong> means an independent driver (Cab, Auto, Bike-Taxi, Acting Driver or Parcel Delivery Partner) registered on the Platform.</p><p class=\"term\"><strong>\"Vendor\"</strong> means an individual or entity that makes a vehicle available to a Driver Partner for use on the Platform.</p><p class=\"term\"><strong>\"Services\"</strong> means collectively, Local Rides, Auto, Drop Taxi, Outstation Trips, Acting Driver Services, Root Delivery (Parcel Delivery), Bike Taxi and any other service offered through the Platform.</p><p class=\"term\"><strong>\"Root Cabs Wallet\" or \"Wallet\"</strong> means the closed-loop, non-transferable stored-value account described in the Wallet & Customer Money Policy.</p><p class=\"term\"><strong>\"Fare\"</strong> means the amount payable by a Customer for a Ride or Root Delivery consignment, as displayed on the Platform prior to and upon completion of the booking.</p><p class=\"term\"><strong>\"Driver Commission\"</strong> means the percentage of Fare retained by Root Cabs as a platform/technology fee, currently positioned in the 12%-18% range referred to in Section 8.</p>"
      },
      {
        "id": "eligibility",
        "title": "2. Eligibility",
        "content": "<ul><li>You must be at least 18 years of age and competent to contract under the Indian Contract Act, 1872 to register on the Platform.</li><li>Driver Partners must additionally hold a valid driving licence appropriate to the vehicle category, valid vehicle documents (RC, insurance, permit, fitness certificate, PUC), and satisfy any background-verification criteria Root Cabs may prescribe.</li><li>Root Cabs relies on the accuracy of information provided at registration and is not liable for consequences arising from false or incomplete information provided by a User.</li><li>Root Cabs reserves the right to refuse registration, or to suspend or terminate an Account, if it determines that a User is not eligible or has provided inaccurate information.</li></ul>"
      },
      {
        "id": "nature-of-the-platform",
        "title": "3. Nature of the Platform",
        "content": "<p>Root Cabs is a technology aggregator that connects Customers seeking transportation or delivery services with independent Driver Partners. Root Cabs does not itself own or operate the vehicles used to provide Services (except where explicitly stated) and is not a common carrier. The contract for carriage of passengers or goods is between the Customer and the Driver Partner; Root Cabs facilitates discovery, booking, dispatch, payment collection and dispute resolution as an intermediary under the Information Technology Act, 2000 and, where applicable, as an aggregator under the Motor Vehicle Aggregator Guidelines, 2020.</p>"
      },
      {
        "id": "services-offered",
        "title": "4. Services Offered",
        "content": "<ul><li>Local Ride Bookings</li><li>Auto</li><li>Drop Taxi</li><li>Outstation Trips (one-way and round trip)</li><li>Airport Transfers</li><li>Hourly Packages</li><li>Acting Driver Services</li><li>Root Delivery - Parcel Delivery Services</li><li>Bike Taxi</li><li>Wallet Services</li><li>Referral and promotional programmes</li><li>Future services introduced by Root Cabs</li></ul><p>Service availability depends on location coverage, Driver Partner availability and operational conditions. Root Cabs reserves the right to modify, suspend or discontinue any Service or feature, with reasonable notice where practicable.</p>"
      },
      {
        "id": "account-registration-and-use",
        "title": "5. Account Registration and Use",
        "content": "<ul><li>Users must provide accurate, current and complete information during registration and keep it updated.</li><li>Accounts are personal, non-transferable, and must not be shared with or used by any unauthorised person.</li><li>Users are responsible for maintaining the confidentiality of login credentials and OTPs, and for all activity occurring under their Account.</li><li>Root Cabs may suspend or terminate an Account involved in fraud, unauthorised use, policy violations, or repeated misuse, with notice where reasonably practicable.</li></ul>"
      },
      {
        "id": "booking-process",
        "title": "6. Booking Process",
        "content": "<ul><li>Customers must provide accurate pickup and drop details, date, time and contact information, and are responsible for verifying booking details before confirming.</li><li>Booking confirmation is subject to Driver Partner availability and operational feasibility; Root Cabs does not guarantee allocation of a vehicle in every instance, including due to driver unavailability, technical issues, safety concerns or operational limitations.</li><li>For Outstation and Airport Transfer bookings, additional terms (minimum-kilometre billing, driver allowance, toll pass-through) will be displayed at the time of booking and form part of the Fare.</li></ul>"
      },
      {
        "id": "fare-and-payment-terms",
        "title": "7. Fare and Payment Terms",
        "content": "<ul><li>Customers are responsible for the Fare, applicable tolls, parking, waiting charges, additional-distance/additional-hour charges, applicable taxes (including GST), and any other charges displayed on the Platform at or before booking confirmation.</li><li>Payment may be made via cash, UPI, card, net-banking, or the Root Cabs Wallet, as enabled for the relevant Service.</li><li>Driver Partners must collect only the Fare and charges communicated through the Platform. Any request by a Driver Partner for additional unauthorised payment should be reported to Root Cabs Support immediately.</li><li>Digital payments are processed through RBI-authorised Payment Aggregator/Gateway partners; Root Cabs does not store full card details. See the Wallet & Customer Money Policy for further detail.</li></ul>"
      },
      {
        "id": "driver-commission-and-fee-transparency",
        "title": "8. Driver Commission and Fee Transparency",
        "content": "<p>Root Cabs is built on a low-commission, high-transparency model. Unless otherwise notified for a specific city, service line or promotional period, Root Cabs retains a platform/technology fee (\"Driver Commission\") in the range of 12% to 18% of the Fare - materially lower than prevailing industry-standard commissions. The Driver Commission covers access to the Root Cabs application, real-time GPS dispatch, payment processing coordination, 24/7 technical and safety support, and platform maintenance.</p><div class=\"rc-policy-table-wrap\"><table class=\"rc-policy-table\"><thead><tr><th>Charge</th><th>Who Bears It</th><th>Nature</th></tr></thead><tbody><tr><td>Fare</td><td>Customer</td><td>Consideration for the ride/delivery, shared between Driver Partner earnings and Driver Commission</td></tr><tr><td>Driver Commission (12%-18%)</td><td>Driver Partner (deducted from Fare)</td><td>Root Cabs platform/technology fee</td></tr><tr><td>GST</td><td>Customer / as applicable by law</td><td>Statutory tax remitted to the Government</td></tr><tr><td>Payment Gateway charge</td><td>As applicable, passed through at actuals</td><td>Third-party charge, not retained by Root Cabs</td></tr><tr><td>Toll, parking, waiting, additional distance</td><td>Customer</td><td>Actual pass-through cost</td></tr></tbody></table></div><p>Root Cabs will provide reasonable prior notice to Driver Partners of any change to the Driver Commission structure, consistent with its trust and transparency positioning.</p>"
      },
      {
        "id": "cancellation-policy",
        "title": "9. Cancellation Policy",
        "content": "<h3>9.1 Customer Cancellation</h3><p>Customers may cancel a booking without charge during the applicable free-cancellation window shown on the Platform. Cancellations made after a Driver Partner has been assigned and has started travelling towards the pickup location, beyond the free-cancellation window, may attract a cancellation charge, displayed prior to cancellation. Pending cancellation charges may be settled by adjustment against the Wallet, deduction at the next eligible booking, or another approved payment method; unresolved dues may result in restriction of future bookings.</p><h3>9.2 Cancellation Credits</h3><p>Where Root Cabs determines a cancellation was attributable to a service failure (e.g., prolonged driver delay), it may credit Wallet Points to the Customer's Wallet at its discretion, subject to the Wallet & Customer Money Policy.</p><h3>9.3 Driver Cancellation</h3><p>Driver Partners are expected to complete accepted rides and avoid unnecessary cancellations. A Driver Partner may cancel up to three (3) rides per day without penalty; cancellations beyond this limit may attract adjustments against earnings or Wallet balance, or temporary restrictions, subject to reasonable exceptions for vehicle breakdown, accident, medical emergency, safety concerns or other circumstances beyond reasonable control.</p>"
      },
      {
        "id": "refunds",
        "title": "10. Refunds",
        "content": "<ul><li>Refunds may be issued where a ride is cancelled by Root Cabs due to Driver Partner unavailability, a system/payment error, duplicate payment, or an incorrect deduction.</li><li>Refunds are generally not available for Customer no-shows, late cancellations after Driver Partner assignment, or bookings under promotional terms that expressly exclude refunds.</li><li>Eligible refunds are processed to the original payment method or credited to the Root Cabs Wallet, subject to the timelines of the relevant payment provider and the Wallet & Customer Money Policy.</li></ul>"
      },
      {
        "id": "root-cabs-wallet",
        "title": "11. Root Cabs Wallet",
        "content": "<p>Root Cabs Wallet allows Users to hold and use eligible non-transferable credits (Wallet Points and, where enabled, prepaid balance) associated with their Account for payment of Fares and related charges. Wallet features, KYC requirements, reload limits, minimum-balance rules, withdrawal conditions, inactivity and forfeiture terms are governed exclusively by the Root Cabs Wallet & Customer Money Policy, which forms part of these Terms.</p>"
      },
      {
        "id": "root-delivery-parcel-delivery-services",
        "title": "12. Root Delivery (Parcel Delivery Services)",
        "content": "<ul><li>Root Delivery enables Customers to book parcel pickup and delivery through Driver Partners, subject to weight, dimension and content restrictions displayed on the Platform.</li><li>Customers must not tender prohibited, hazardous, illegal, perishable-without-disclosure, or high-value items for delivery unless expressly permitted and declared.</li><li>Root Cabs' liability for loss or damage to a parcel, where attributable to Root Cabs or a Driver Partner acting on its instructions, is limited as set out in Section 16; Customers are encouraged to declare parcel value accurately at booking.</li></ul>"
      },
      {
        "id": "safety-and-security",
        "title": "13. Safety and Security",
        "content": "<ul><li>Driver Partners must drive responsibly, follow applicable traffic laws, and must not operate a vehicle under the influence of alcohol, drugs or other intoxicating substances.</li><li>Users must not engage in conduct that compromises the safety of any Customer, Driver Partner or third party.</li><li>Root Cabs provides in-app safety features (SOS/emergency contact alerts and trip sharing, where available) and encourages immediate reporting of safety concerns to Root Cabs Support.</li><li>GPS tracking is used on vehicles registered with the Platform for security, dispatch and dispute-resolution purposes, consistent with the Privacy Policy.</li></ul>"
      },
      {
        "id": "user-conduct",
        "title": "14. User Conduct",
        "content": "<p>Users must not use the Platform for any unlawful purpose, misuse promotional benefits or referral programmes, attempt fraud, attempt unauthorised access to the Platform or another User's Account, harass or threaten any other User or Driver Partner, or otherwise violate applicable law or these Terms. Root Cabs reserves the right to investigate suspected violations and take proportionate action, including warning, suspension or termination of the Account.</p>"
      },
      {
        "id": "intellectual-property",
        "title": "15. Intellectual Property",
        "content": "<p>All trademarks, logos, application design, software and content on the Platform, including the \"Root Cabs\" name and mark, are owned by or licensed to Texve Innovations Private Limited and are protected under applicable intellectual property law. Users may not copy, reproduce, reverse-engineer, or create derivative works from the Platform or its content without prior written consent.</p>"
      },
      {
        "id": "disclaimers-and-limitation-of-liability",
        "title": "16. Disclaimers and Limitation of Liability",
        "content": "<p>The Platform is provided on an \"as is\" and \"as available\" basis. Root Cabs makes reasonable efforts to ensure Services are reliable but does not warrant that the Platform will be uninterrupted, error-free or available at all times. As Root Cabs acts as a technology intermediary connecting Customers and Driver Partners, Root Cabs shall not be liable for:</p><ul><li>the conduct, negligence or acts/omissions of any Driver Partner, Vendor or Customer;</li><li>delays or service interruptions caused by traffic, weather, road closures, government restrictions, or other events beyond Root Cabs' reasonable control (Force Majeure);</li><li>loss of, or damage to, personal belongings or parcels left in a vehicle, beyond the best-effort recovery assistance Root Cabs provides;</li><li>indirect, incidental or consequential loss arising from use of the Platform.</li></ul><p>Subject to applicable consumer-protection law, Root Cabs' aggregate liability arising out of or relating to a single booking shall not exceed the Fare paid for that booking, except in cases of Root Cabs' proven wilful default or gross negligence.</p>"
      },
      {
        "id": "indemnity",
        "title": "17. Indemnity",
        "content": "<p>You agree to indemnify and hold harmless Root Cabs, its affiliates, officers and employees from claims, losses, damages and reasonable legal costs arising out of your breach of these Terms, misuse of the Platform, or violation of applicable law.</p>"
      },
      {
        "id": "grievance-redressal",
        "title": "18. Grievance Redressal",
        "content": "<p>In accordance with the Consumer Protection (E-Commerce) Rules, 2020 and the IT (Intermediary Guidelines) Rules, 2021, Root Cabs designates a Grievance Officer to address Customer and Driver Partner complaints.</p><div class=\"rc-policy-table-wrap\"><table class=\"rc-policy-table\"><thead><tr><th>Level</th><th>Contact</th><th>Response Timeline</th></tr></thead><tbody><tr><td>Level 1 - Customer Support</td><td>support@rootcabs.com / +91 860 860 2829</td><td>Acknowledgement within 24-48 hours</td></tr><tr><td>Level 2 - Grievance Officer</td><td>grievance@rootcabs.com</td><td>Resolution within 30 days, or as prescribed under applicable law</td></tr></tbody></table></div><p>Users may also approach the consumer disputes redressal forum having jurisdiction, or the National Consumer Helpline, without prejudice to the dispute-resolution mechanism in Section 20.</p>"
      },
      {
        "id": "termination",
        "title": "19. Termination",
        "content": "<p>Root Cabs may suspend or terminate access to the Platform for breach of these Terms, fraud, safety violations, or regulatory requirement, with notice where reasonably practicable. Users may close their Account at any time by contacting Root Cabs Support, subject to settlement of pending bookings, dues and Wallet balances in accordance with the Wallet & Customer Money Policy.</p>"
      },
      {
        "id": "governing-law-and-dispute-resolution",
        "title": "20. Governing Law and Dispute Resolution",
        "content": "<p>These Terms are governed by the laws of India. Any dispute shall first be referred to good-faith negotiation between the parties for thirty (30) days. If unresolved, the dispute shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, before a sole arbitrator mutually appointed, with the seat and venue of arbitration at Vellore, Tamil Nadu, and proceedings conducted in English. Subject to the foregoing, the courts at Vellore/Chennai, Tamil Nadu shall have exclusive jurisdiction. Nothing in this clause limits a consumer's right to approach a consumer forum under the Consumer Protection Act, 2019.</p>"
      },
      {
        "id": "changes-to-these-terms",
        "title": "21. Changes to these Terms",
        "content": "<p>Root Cabs may amend these Terms from time to time. Updated Terms take effect upon publication on the Platform, and continued use after that date constitutes acceptance. Material changes will be notified through the app, SMS or e-mail where reasonably practicable.</p>"
      },
      {
        "id": "contact-information",
        "title": "22. Contact Information",
        "content": "<p>Root Cabs, a unit of Texve Innovations Private Limited</p><p>No. 42, 1st Floor, VIT Main Road, Tharapadavedu, Katpadi, Vellore - 632007, Tamil Nadu</p><p>Support: +91 860 860 2829 | E-mail: support@rootcabs.com</p>"
      }
    ],
    "footer": "Root Cabs - a unit of Texve Innovations Private Limited | No. 42, 1st Floor, VIT Main Road, Tharapadavedu, Katpadi, Vellore - 632007, Tamil Nadu | support@rootcabs.com"
  },
  "wallet-policy": {
    "key": "wallet-policy",
    "title": "Wallet & Customer Money Policy",
    "subtitle": "Terms governing the Root Cabs Wallet, reloads, refunds, and Driver Partner settlements.",
    "eyebrow": "A unit of Texve Innovations Private Limited",
    "effective": "Effective 1 August 2026",
    "jurisdiction": "Jurisdiction: Tamil Nadu, India",
    "contact": "wallet@rootcabs.com",
    "footer_contact": "wallet@rootcabs.com",
    "nav": [
      {
        "label": "Privacy Policy",
        "slug": "privacy-policy"
      },
      {
        "label": "Terms of Service",
        "slug": "terms-of-use"
      },
      {
        "label": "Wallet Policy",
        "slug": "wallet-policy"
      }
    ],
    "intro": [
      "<p>This Wallet & Customer Money Policy (\"Wallet Policy\") governs the \"Root Cabs Wallet\" (\"Wallet\") made available by Texve Innovations Private Limited, operating under the brand \"Root Cabs\" (\"Root Cabs\", \"we\", \"us\", \"our\"), to Customers and Driver Partners on the Platform. This Wallet Policy forms part of, and must be read together with, the Root Cabs Terms of Service and the Root Cabs Privacy Policy. By activating or using the Wallet, you agree to be bound by this Wallet Policy.</p>"
    ],
    "sections": [
      {
        "id": "definitions",
        "title": "1. Definitions",
        "content": "<p class=\"term\"><strong>\"Wallet\" or \"Root Cabs Wallet\"</strong> means the closed-system, non-transferable, INR-denominated stored-value account maintained for a User within the Platform, used solely to pay for Fares, charges and other amounts payable to Root Cabs or its Driver Partners through the Platform.</p><p class=\"term\"><strong>\"Wallet Balance\"</strong> means the sum of all eligible credits standing to a User's Wallet at a given time, comprising Reload Balance and Wallet Points.</p><p class=\"term\"><strong>\"Reload Balance\"</strong> means the portion of Wallet Balance, if and where this feature is enabled, added by a Customer through an approved payment method (UPI, debit/credit card, net-banking) for the sole purpose of paying for future Services.</p><p class=\"term\"><strong>\"Wallet Points\"</strong> means non-transferable credits issued at Root Cabs' discretion, including cancellation credits, refund credits, promotional rewards, referral bonuses and goodwill credits, which have no cash-withdrawal value.</p><p class=\"term\"><strong>\"Driver Earnings Wallet\"</strong> means the ledger maintained for a Driver Partner reflecting completed-trip earnings net of Driver Commission, available for periodic settlement/payout to the Driver Partner's registered bank account, distinct from the Customer Wallet described in this Policy.</p><p class=\"term\"><strong>\"Payment Aggregator\" or \"PA\"</strong> means an RBI-authorised entity engaged by Root Cabs to process digital payments (card, UPI, net-banking) on the Platform in compliance with the RBI Master Directions for Payment Aggregators, 2020/2021.</p><p class=\"term\"><strong>\"KYC\"</strong> means Know Your Customer verification undertaken in accordance with applicable RBI/PMLA norms, to the extent required for the features enabled on the Wallet.</p>"
      },
      {
        "id": "nature-and-purpose-of-the-root-cabs-wallet",
        "title": "2. Nature and Purpose of the Root Cabs Wallet",
        "content": "<ul><li>The Wallet is a closed-loop account for use exclusively on the Root Cabs Platform, for payment of Fares and related charges for Local Rides, Auto, Drop Taxi, Outstation Trips, Acting Driver Services, Root Delivery and Bike Taxi.</li><li>The Wallet is not a bank account, is not insured by the Deposit Insurance and Credit Guarantee Corporation, and does not earn interest.</li><li>The Wallet Balance cannot be withdrawn as cash, transferred to another User's Wallet, or transferred to a bank account or UPI handle, except where Root Cabs expressly enables a Driver Partner payout mechanism as described in Section 9.</li><li>Currency of the Wallet is Indian Rupees (INR) only.</li></ul>"
      },
      {
        "id": "sources-of-wallet-balance",
        "title": "3. Sources of Wallet Balance",
        "content": "<h3>3.1 Wallet Points (Always Available)</h3><ul><li>Cancellation credits issued under the Terms of Service;</li><li>Refund credits for eligible cancelled, duplicate or erroneously charged bookings;</li><li>Promotional rewards, festival/launch offers and loyalty credits;</li><li>Referral bonuses under the Root Cabs referral programme;</li><li>Goodwill credits issued at Root Cabs' discretion for service-recovery purposes.</li></ul><h3>3.2 Reload Balance (Where Enabled)</h3><p>Where Root Cabs enables customer-funded reloads, a Customer may add money to the Wallet only through the Payment Aggregator-integrated payment methods displayed on the Platform (UPI, debit/credit card, net-banking). Root Cabs does not accept cash reloads directly into the Wallet outside a Driver Partner's device-based collection flow, if any. Reload Balance, once added, can be used only to pay for Root Cabs Services and cannot be redeemed for cash, transferred, or used outside the Platform, consistent with the closed-system classification in Section 1.</p><h3>3.3 Reload Limits</h3><p>Until such time as Root Cabs obtains a PPI authorisation or partners with a licensed PPI issuer, reload limits will be kept conservative and reviewed periodically:</p><div class=\"rc-policy-table-wrap\"><table class=\"rc-policy-table\"><thead><tr><th>Wallet Tier</th><th>Verification Required</th><th>Max Balance at Any Time</th><th>Max Reload per Month</th></tr></thead><tbody><tr><td>Standard (mobile-verified)</td><td>Registered mobile number + OTP</td><td>Rs. 5,000</td><td>Rs. 5,000</td></tr><tr><td>Enhanced (optional KYC)</td><td>PAN or Aadhaar-based e-KYC, where introduced</td><td>Rs. 10,000 or the then-applicable closed-system/PPI ceiling</td><td>Rs. 10,000</td></tr></tbody></table></div>"
      },
      {
        "id": "using-the-wallet",
        "title": "4. Using the Wallet",
        "content": "<ul><li>Wallet Balance may be applied automatically or by User selection at checkout to pay for an eligible booking, in full or partial combination with another payment method, as supported by the Platform.</li><li>Wallet Points are consumed before Reload Balance, unless the Platform display indicates otherwise, so promotional credits are utilised ahead of the User's own funds.</li><li>Wallet Balance cannot be used to pay another User, cannot be gifted, and is strictly non-transferable between Accounts.</li><li>The entire eligible Wallet Balance may be used towards a booking, subject to Section 6 (Withdrawal) where applicable to Wallet Points specifically designated as withdrawable.</li></ul>"
      },
      {
        "id": "cancellation-credits-and-refunds-into-the-wallet",
        "title": "5. Cancellation Credits and Refunds into the Wallet",
        "content": "<ul><li>Where a booking is cancelled by Root Cabs or a Driver Partner due to non-fulfilment, or where a duplicate or erroneous charge is identified, Root Cabs may credit the affected amount to the Customer's Wallet as Wallet Points, or, where the original payment was made through a digital instrument, process a refund to the original payment method, at Root Cabs' discretion or the Customer's election where offered.</li><li>Refunds to original payment methods are subject to the processing timelines of the relevant bank/Payment Aggregator and are outside Root Cabs' direct control.</li><li>Cash-paid bookings are refunded, where eligible, as Wallet Points, since RBI norms do not permit refund of wallet credits as cash.</li></ul>"
      },
      {
        "id": "withdrawal-of-wallet-points-driver-partners",
        "title": "6. Withdrawal of Wallet Points (Driver Partners)",
        "content": "<p>This Section applies to Driver Partner incentive/bonus Wallet Points credited outside the trip-earnings settlement process (governed separately under Section 9). Where Root Cabs permits withdrawal of such Wallet Points:</p><ul><li>A minimum balance of 500 Wallet Points must be maintained in the Wallet at all times; only the balance in excess of this threshold is eligible for withdrawal (e.g., of an 800-point balance, 500 points must remain and 300 points are withdrawable).</li><li>Withdrawal requests are subject to Account verification, transaction verification and Root Cabs' approval, and will be processed to the Driver Partner's verified bank account within the timeline displayed on the Platform.</li><li>Wallet Points cannot be withdrawn by Customers as cash under any circumstance, consistent with the closed-system nature of the Customer Wallet.</li></ul>"
      },
      {
        "id": "wallet-validity-inactivity-and-forfeiture",
        "title": "7. Wallet Validity, Inactivity and Forfeiture",
        "content": "<ul><li>A Wallet with no transaction activity for a continuous period of one (1) year may be marked inactive and will require re-verification before further use.</li><li>Wallet Points issued as promotional or cancellation credits are valid for the period stated at issuance (or, if unstated, twelve (12) months from the date of credit), after which unused Wallet Points may lapse.</li><li>Root Cabs will make reasonable efforts to notify Users by SMS, e-mail or in-app notification at least fifteen (15) days before expiry of a material Wallet Points balance.</li><li>Users acknowledge they will have no claim against Root Cabs for Wallet Points forfeited on expiry, or on account of Account termination for a breach of the Terms of Service.</li></ul>"
      },
      {
        "id": "security-and-unauthorised-transactions",
        "title": "8. Security and Unauthorised Transactions",
        "content": "<ul><li>Users are responsible for keeping their login credentials, device PIN and OTPs confidential and must not share them with any person, including a Driver Partner or Root Cabs staff.</li><li>Root Cabs will never ask for your OTP, password or full card details over a call, SMS or e-mail; any such request should be treated as fraudulent and reported immediately to security@rootcabs.com.</li><li>Where a User promptly reports (within 72 hours) a lost device or suspected unauthorised access, Root Cabs will make reasonable efforts to freeze the Wallet pending investigation; the User remains liable for transactions occurring before such report to the extent attributable to their own negligence, consistent with applicable RBI customer-liability norms.</li><li>Root Cabs will investigate suspected fraud and may restrict or suspend the Wallet during investigation, notifying the User of the outcome.</li></ul>"
      },
      {
        "id": "driver-partner-trip-earnings-and-settlement",
        "title": "9. Driver Partner Trip Earnings and Settlement",
        "content": "<p>This Section governs money owed to Driver Partners for completed trips and is distinct from the Customer Wallet described above.</p><ul><li>Fares collected digitally are processed through Root Cabs' Payment Aggregator and recorded against the relevant Driver Partner's Driver Earnings Wallet, net of Driver Commission and any applicable cancellation-penalty adjustments.</li><li>Fares collected in cash by a Driver Partner directly from a Customer are retained by the Driver Partner at the time of collection; Root Cabs may true-up the applicable Driver Commission against future digital settlements or Wallet balance as displayed on the Driver Partner app.</li><li>Settlement of the Driver Earnings Wallet to the Driver Partner's registered bank account will occur on the cycle displayed on the Platform (e.g., daily/weekly), subject to completion of KYC and bank-account verification.</li><li>Any dispute regarding trip earnings must be raised within seven (7) days of the relevant trip through the Driver Partner app or Root Cabs Support.</li></ul>"
      },
      {
        "id": "chargebacks",
        "title": "10. Chargebacks",
        "content": "<p>A Customer who has paid by card or UPI may have chargeback rights under the rules of their card network, bank or UPI app; such chargeback requests are processed by the Customer's bank/payment provider and not directly by Root Cabs. Root Cabs will cooperate with the Payment Aggregator and provide transaction records reasonably required to assess a chargeback claim, and reserves the right to review Account and transaction history to investigate potential fraud.</p>"
      },
      {
        "id": "prohibited-uses",
        "title": "11. Prohibited Uses",
        "content": "<ul><li>Using the Wallet for money laundering, terror financing, gambling, or any unlawful purpose;</li><li>Creating multiple Accounts to abuse promotional Wallet Points or referral credits;</li><li>Attempting to transfer, sell, or exchange Wallet Balance outside the Platform;</li><li>Circumventing reload limits through structuring of transactions.</li></ul><p>Root Cabs may freeze, forfeit, or reverse Wallet credits obtained through any of the above, and may report suspicious activity to the appropriate authorities, including under the Prevention of Money Laundering Act, 2002 where applicable.</p>"
      },
      {
        "id": "data-handling-for-payment-information",
        "title": "12. Data Handling for Payment Information",
        "content": "<p>Root Cabs does not store full debit/credit card numbers, CVV or net-banking credentials; these are handled exclusively by its RBI-authorised Payment Aggregator in compliance with PCI-DSS standards, as described in the Privacy Policy. Root Cabs stores only tokenised references, masked card details, transaction identifiers and Wallet ledger entries necessary to operate the Wallet and reconcile payments.</p>"
      },
      {
        "id": "limitation-of-liability",
        "title": "13. Limitation of Liability",
        "content": "<p>Root Cabs will exercise reasonable care in operating the Wallet but shall not be liable for delays or failures attributable to a Payment Aggregator, bank, telecom operator or other third party, or for events of Force Majeure. Subject to applicable law, Root Cabs' aggregate liability in connection with the Wallet for any User shall not exceed the Wallet Balance held by that User at the time the relevant claim arose, save in cases of Root Cabs' proven wilful default or gross negligence.</p>"
      },
      {
        "id": "account-and-wallet-closure",
        "title": "14. Account and Wallet Closure",
        "content": "<p>On closure of a User's Account, any withdrawable balance (for Driver Partners, under Section 6) will be settled subject to verification, and any remaining non-withdrawable Wallet Points will be forfeited, consistent with Section 7 and the Privacy Policy's account-deletion provisions. Refundable Reload Balance, where the Wallet supports customer-funded reloads, will be refunded to the original payment source on request, net of any amounts already utilised, subject to identity verification.</p>"
      },
      {
        "id": "grievance-redressal-for-wallet-and-payment-issues",
        "title": "15. Grievance Redressal for Wallet and Payment Issues",
        "content": "<div class=\"rc-policy-table-wrap\"><table class=\"rc-policy-table\"><thead><tr><th>Channel</th><th>Contact</th><th>Response Timeline</th></tr></thead><tbody><tr><td>Wallet/payment support</td><td>wallet@rootcabs.com / +91 860 860 2829</td><td>Acknowledgement within 24-48 hours</td></tr><tr><td>Escalation / Grievance Officer</td><td>grievance@rootcabs.com</td><td>Resolution within 30 days</td></tr></tbody></table></div>"
      },
      {
        "id": "amendments",
        "title": "16. Amendments",
        "content": "<p>Root Cabs may amend this Wallet Policy, including reload limits, KYC requirements and fee structures, to reflect changes in applicable law (including any future RBI authorisation Root Cabs obtains, or any Payment Aggregator/PPI partnership it enters into), business needs, or security requirements. Material changes will be notified through the app, SMS or e-mail, and continued use of the Wallet after the effective date of the revised Policy constitutes acceptance.</p>"
      },
      {
        "id": "governing-law-and-jurisdiction",
        "title": "17. Governing Law and Jurisdiction",
        "content": "<p>This Wallet Policy is governed by the laws of India, including the Payment and Settlement Systems Act, 2007 and applicable RBI directions. Disputes shall be resolved in accordance with Section 20 (Governing Law and Dispute Resolution) of the Root Cabs Terms of Service, with courts at Vellore/Chennai, Tamil Nadu having exclusive jurisdiction, subject to consumer-forum rights under the Consumer Protection Act, 2019.</p>"
      },
      {
        "id": "contact",
        "title": "18. Contact",
        "content": "<p>Root Cabs, a unit of Texve Innovations Private Limited, No. 42, 1st Floor, VIT Main Road, Tharapadavedu, Katpadi, Vellore - 632007, Tamil Nadu</p><p>Wallet Support: wallet@rootcabs.com | +91 860 860 2829</p>"
      }
    ],
    "footer": "Root Cabs - a unit of Texve Innovations Private Limited | No. 42, 1st Floor, VIT Main Road, Tharapadavedu, Katpadi, Vellore - 632007, Tamil Nadu | wallet@rootcabs.com"
  }
} as Record<string, PolicyDocument>;

export function getPolicyDocument(key: string): PolicyDocument | null {
  return policyDocuments[key] ?? null;
}
