
# Security

## Data Centers and Location

Kliv production services are hosted on Amazon Web Services' ("AWS") EC2 platform. The physical servers are located in AWS's EC2 data centers. As of this date, AWS (i) has certifications for compliance with ISO/IEC 27001:2013, 27017:2015 and 27018:2014, (ii) is certified as a PCI DSS 3.2 Level 1 Service Provider, and (iii) undergoes SOC 1, SOC 2 and SOC 3 audits (with semi-annual reports).

Additional details about AWS' compliance programs, including FedRAMP compliance, can be found at AWS' website.

Kliv's production environment is hosted on an AWS EC2 platform. User content can also be found in Kliv backups, stored in AWS EC2, S3 and Glacier.

## Production Environment

We maintain separate and distinct production, staging, and development environments for Kliv.

To access Kliv's production environment, authorized and trained members of Kliv's site reliability engineering team and select Engineering team members ("Authorized Personnel") authenticate to the VPN using unique strong passwords and hardware-based tokens and then only access the production environment via ssh terminal connections using passphrase protected personal RSA certificates.

Authorized Personnel are trained not to replicate non-public user data stored in Kliv's production environment onto their workstations or mobile devices.

## Network Security

AWS Network ACL and Security Groups are used to restrict access to Kliv's systems as appropriate to their role.

Public access is restricted to port 443 and 80 on the network load balancers for public traffic.

## Login Security

SAML 2.0 SSO is supported for Kliv Enterprise customers. All customers can enable 2FA on their accounts.

If SSO is used to access Kliv, Kliv will inherit the login security settings in the user's IdP or Google account.

If logging in directly to Kliv using a username or email and password, Kliv requires a minimum of 8 characters.

Repeated failed login attempts trigger a 30 second lock before a user can retry. Passwords are stored in a hashed form and will never be sent via email—upon account creation and password reset, Kliv will send a link to the email associated with the account that will enable the user to create a new password.

Password complexity and session length requirements cannot be customized within the app. However, these can be set within an IdP for an SSO-enforced team.

## Access Control

All user data stored in Kliv is protected in accordance with our obligations in the Terms of Service, and access to such data by Authorized Personnel is based on the principle of least privilege. Only Authorized Personnel have direct access to Kliv's production systems. Those who do have direct access to production systems are only permitted to view user data stored in Kliv in the aggregate, for troubleshooting purposes or as otherwise permitted in Kliv's Privacy Policy.

Kliv maintains a list of Authorized Personnel with access to the production environment. These members undergo criminal background checks and are approved by Kliv's Engineering management. Kliv also maintain a list of personnel who are permitted to access Kliv code, as well as the development and staging environments. These lists are reviewed quarterly and upon role change.

Trained members of the Kliv customer support team also have case-specific, limited access to user data stored in Kliv through restricted access customer support tools. Customer support team members are not authorized to review non-public user data stored in Kliv for customer support purposes without explicit permission.

Upon role change or leaving the company, the production credentials of Authorized Personnel are deactivated, and their sessions are forcibly logged out. Thereafter, all such accounts are removed or changed.

## Public Content and Other Permissions

Public data may be viewed or accessed by anyone. In addition, notwithstanding anything to the contrary, data may be collected, shared, retained and used as described in Kliv's Privacy Policy or customer's agreement(s) with Kliv.

## Third Party Access

User data may be shared by Kliv with third-party service providers (a user's email address for an email delivery provider, for example) pursuant to Kliv's Privacy Policy and in compliance with Kliv's applicable signed service agreements.

## Physical Security

Kliv's production services are hosted on Amazon Web Services' ("AWS") EC2 platform. The physical servers are located in AWS' secure data centers.

We require that production critical data is never to be stored by those with privileged access on physical media outside of our data hosting provider's production environments. See above for information on AWS' compliance programs.

## Corporate Environment and Removable Media

Strict firewall rules prohibit access to necessary ports for the usage of Kliv (e.g., 443), to help ensure limited access to the production environment to our VPN network and authorized systems. Our corporate network has no additional access to the production environment, with Authorized Personnel required to connect to the VPN in order to access any special systems or environments.

Authorized Personnel with access to Kliv's production environment are trained as noted above. In addition, employee workstations are required to time out and lock after a maximum of one minute once sleep or the screen saver begins.

We do not have a clean desk policy.

## Encryption In-Transit

Kliv uses industry standard Transport Layer Security ("TLS") to create a secure connection using 128-bit Advanced Encryption Standard ("AES") encryption. This includes all data sent between the web, desktop, iOS, and Android apps and the Kliv servers.

There is no non-TLS option for connecting to Kliv. All connections are made securely over HTTPS.

## Encryption At-Rest

Data drives on servers holding user data use full disk, industry-standard AES encryption.

Customer databases are stored in Amazon's S3 service and encrypted using Amazon S3 server side 256-bit AES encryption.

The encryption, key management, and decryption process is inspected and verified internally by Amazon on a regular basis as part of their existing audit process. All Kliv backups are encrypted with AES encryption.

## Encryption Keys

Encryption keys for Kliv attachments, stored in S3, are managed by Amazon. The encryption, key management, and decryption process is inspected and verified internally by Amazon on a regular basis as part of their existing audit process.

Encryption keys managed by our team are not stored outside of Kliv's production backup environment and are managed by the our SRE team.

Kliv backups are of the entire data set, so they are encrypted using a shared key.

## Data Deletion - Termination of Agreement

Upon termination of a Kliv Enterprise contract, if requested by the Kliv customer's administrator, the user content that is stored by Kliv will be completely removed from the live Kliv production database within 30 days. The team's data will remain in encrypted Kliv database backups until those backups fall out of the 90-day backup retention window and are destroyed in accordance with our data retention policy. In the event that a database restore is necessary within 90 days of a requested data deletion, we will re-delete the data as soon as reasonably possible after the live production system is fully restored.

For clarity, if a customer continues to use Kliv pursuant to a free account or different plan following the termination of a Business Class or Enterprise contract, such data may be retained for use in accordance with the terms and conditions applicable to such account or plan.

## Data Deletion - User Personal Data

In the case of a Kliv user account being deleted, upon deletion, Kliv deletes the user's personal data, including items like name, email address and location, within 30 days of the request. After 30 days, such personal data will remain in encrypted Kliv database backups until those backups fall out of the 90-day retention window and are completely destroyed.

In certain cases where Kliv has a legitimate business or legal purpose to do so, Kliv may keep user personal data. Some examples of this include financial information related to things like purchases and billing records; records showing why the account was deleted; or data relating to a litigation or other legal inquiry.

## Development, Patch and Configuration Management

All changes to the Kliv production system, be they code or system configuration changes, require review prior to deployment to the production environment. Production code is also subject to regularly conducted automated vulnerability scans. All changes to Kliv's code are tested in a staging environment prior to deployment to production. Patches to the Kliv web client are deployed on a rolling basis, usually several times per week. Kliv production servers are managed via a centralized configuration system. Patches are deployed as relevant to their level of security and stability impact, with critical patches able to be deployed well within 24 hours of availability as appropriate.

We restrict access as noted above and maintain separate lists of relevant roles with access to source code, development, staging, and production environments. These lists are reviewed quarterly and upon role change. We use source code management tools and repositories.

All production servers are running a LTS (Long Term Support) distribution of their operating system to ensure timely updates are available. CVE lists and notifications are actively monitored and any systems can be patched in a timeline relevant to the severity of the issue.

## Event Logging

Certain user actions which manipulate user data are stored within Kliv and are available for the customer/user.

All Kliv API calls and application logs are kept for our internal purposes for at least 30 days without sensitive information (no full user tokens, no user generated content), and are available only for authorized employees as required by their role for monitoring of Kliv to ensure service availability and performance and to prevent abuse.

Application logs for Kliv are centrally collected in Amazon CloudWatch for a minimum of 30 days for monitoring and analysis.

## Asset Management

While some assets are not owned by a specific individual, ownership and maintenance of the confidentiality, integrity, and availability of our systems is distributed amongst the SRE and Operations teams. Assets are transferred upon role change or leaving the company.

## Data Within Kliv

Kliv validates files for well-formedness. We will attempt to reject any files that do not conform to appropriate standards.

## Backup, Business Continuity, and Disaster Recovery Policy

### Backup Policy

Kliv configuration and metadata is backed up regularly. All backups are encrypted and managed by Amazon AWS and designed such that they are available in the unlikely event that a restore is necessary.

Databases stored by Kliv are not backed up on the same schedule, and instead rely on Amazon S3's internal redundancy mechanism.

Because user data stored in Kliv is on a shared infrastructure, it is not possible for us to recover a subset of that information from backups. If any customer is particularly concerned with maintaining a complete record of their information in Kliv, we suggest that such customer frequently exports its data or use our API to connect a DLP tool to Kliv.

### Backup Interval

Kliv creates a full backup snapshot of the primary database once every 24 hours.

### Backup Storage

All Kliv backups are retained inside Amazon AWS.

Only authorized members of the Kliv operations team have access to the backup process, so that they are able to monitor the performance of the backup processes, and in the very unlikely event that a restore becomes necessary.

After 90 days, the encrypted backup files are destroyed.

Databases stored within Kliv are handled differently than the primary database backups. To backup databases, Kliv primarily relies on S3's internal redundancy mechanism, which Amazon states provides 99.99% yearly data durability.

### Data Portability

Kliv report defintions, user information and metadata is available for export by authorized users in JSON format via the Kliv REST API.

Databases hosted by Kliv can be downloaded by the Kliv API and are stored in industry-standard SQLite format.

### Business Continuity

The Kliv operations team has designed systems to keep the service running even if the underlying infrastructure experiences an outage or other significant issue. Every critical Kliv service has a secondary, replicated service running simultaneously with mirrored data in a different AWS availability zone than the primary server.

Because it is critical to have reliable access to your business' important projects and data, Kliv has been architected to survive a single availability zone outage without significant service interruptions.

### Disaster Recovery

In the unlikely event that two Amazon EC2 availability zones have long-term service interruptions, Kliv has been designed to recover with limited service interruption and a target maximum of 1 hour of data loss.

In the even more unlikely event that Kliv's entire AWS EC2 region is irrecoverably lost, we will restore servers using automated configuration systems. In this event, Kliv's systems are designed to recover user data as quickly as reasonably possible, with a target of no more than of 24 hours of data loss.

Kliv's SRE team regularly tests the various components of its Business Continuity architecture to ensure continued operations. Kliv does not currently run anything like Chaos Monkey.

## Incidents and Response

A Kliv problem impacting a Kliv Enterprise customer will be assigned a Severity Level and handled according to the resolutions in Table 1.

**Table 1: Incidents and Response Severity Levels:**

| Level | Description | Resolution | Examples |
|-------|-------------|------------|----------|
| Severity 1 | Kliv is not available or is unusable. | Work begins within 1 hour from report, temporary resolution within 4 hours, final resolution within 7 hours. | The site is not responding. |
| Severity 2 | Service or performance is substantially degraded in a way that prevents normal use. | Work begins within 2 hours from report, temporary resolution within 48 hours, final resolution within 14 days. | Kliv cannot be used with the new Firefox version that came out today. |
| Severity 3 | A service not essential to Kliv's main functionality is unavailable or degraded. | Work begins within 72 hours from report, temporary resolution within 7 days, final resolution within 30 days. | The public report gallery is missing some recently created reports. |
| Severity 4 | Minor or cosmetic issues with Kliv services, and all feature requests. | Resolution at Kliv team's discretion. | Report screenshots have the wrong background color; feature request for a new type of visualization. |

## Employee Policies

### Anti-Virus

For Authorized Personnel, any workstations running Windows or macOS used for ssh terminal access to the production environment must be running update-to-date and anti-virus and anti-malware software with real-time monitoring and at-least-daily updates.

### Remote Access

Many of Kliv's team members work remotely. Strict firewall rules are in place thus limiting access to the production environment to our VPN network and authorized systems. Certain other controls described above, including Authorized Personnel and corporate environment controls, also apply to remote access as appropriate.

### Security Awareness and Confidentiality

Security awareness and user data access policies are covered during our employee onboarding as appropriate to the role and employees are updated as relevant policies or practices change. Our employees also sign a confidentiality agreement.

In the event that a security policy is breached by an employee, Kliv reserves the right to determine the appropriate response, which may include termination.

### Background Checks

All our employees undergo an extensive interview process before hiring. Our employees with direct access to the production environment undergo a criminal background check. Other employees may undergo a check depending on their role (e.g., academic for legal roles or credit for finance roles). Appropriate NDAs are in place with third parties as appropriate.

## Maintenance Policy

### Planned Maintenance

When it is necessary to perform planned maintenance on Kliv services, the Kliv operations team will perform the work during one of two scheduled weekly maintenance windows.

**Planned Maintenance Windows:**
- Tuesday from 3:00 AM US Eastern Time through Tuesday at 6:00 AM US Eastern Time
- Saturday from 3:00 AM US Eastern Time through Sunday at 6:00 AM US Eastern Time

These windows have been selected with the goal of minimizing service downtime, slowness, or other impact to the people and businesses that rely on Kliv.

We do our best to make outages as short as possible. Additionally, our maintenance schedule will frequently be evaluated to ensure that we keep user impact as low as reasonably possible.

### Unplanned Maintenance

Due to unforeseen events, we may have to infrequently perform unplanned maintenance on Kliv infrastructure or software components. This maintenance might cause some or all of the Kliv services to be inaccessible by our users for a period of time. It is our goal to do this as infrequently as possible. As with planned maintenance, we do our best to minimize disruption caused by service outages.
