import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Target, 
  Lightbulb,
  Mail
} from 'lucide-react';

// Job openings data structure
const jobOpenings = [
  {
    id: "senior-ai-engineer",
    title: "Senior AI Engineer",
    department: "Engineering",
    type: "Full-time",
    description: "Lead the development of our AI code generation engine. Work with cutting-edge language models and build systems that transform natural language into production-ready code.",
    responsibilities: [
      "Design and implement AI models for code generation",
      "Optimize model performance and accuracy",
      "Collaborate with the product team on AI feature development",
      "Research and integrate latest AI/ML technologies",
      "Mentor junior engineers and contribute to technical decisions"
    ],
    requirements: [
      "5+ years of experience in AI/ML engineering",
      "Strong background in NLP and language models",
      "Experience with Python, PyTorch/TensorFlow",
      "Knowledge of software engineering best practices",
      "Experience with cloud platforms (AWS, GCP, Azure)"
    ]
  },
  {
    id: "frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    type: "Full-time",
    description: "Build beautiful, responsive user interfaces for our AI-powered development platform. Work with React, TypeScript, and modern web technologies.",
    responsibilities: [
      "Develop and maintain the Kliv web application",
      "Implement real-time preview functionality",
      "Create intuitive user experiences for complex features",
      "Optimize application performance and accessibility",
      "Collaborate with designers and backend engineers"
    ],
    requirements: [
      "4+ years of frontend development experience",
      "Expert knowledge of React, TypeScript, and modern JavaScript",
      "Experience with real-time applications and WebSockets",
      "Strong understanding of web performance optimization",
      "Experience with testing frameworks and CI/CD"
    ]
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    type: "Full-time",
    description: "Build scalable backend systems that power our AI development platform. Work with microservices, databases, and cloud infrastructure.",
    responsibilities: [
      "Design and implement scalable backend APIs",
      "Build systems for code compilation and deployment",
      "Optimize database performance and data modeling",
      "Implement security and authentication systems",
      "Monitor and maintain production infrastructure"
    ],
    requirements: [
      "3+ years of backend development experience",
      "Strong knowledge of Node.js, Python, or Go",
      "Experience with databases (PostgreSQL, Redis)",
      "Knowledge of cloud platforms and containerization",
      "Understanding of microservices architecture"
    ]
  },
  {
    id: "product-manager",
    title: "Senior Product Manager",
    department: "Product",
    type: "Full-time",
    description: "Drive product strategy and roadmap for our AI development platform. Work closely with engineering, design, and customer success teams.",
    responsibilities: [
      "Define product vision and strategy",
      "Gather and analyze user feedback and requirements",
      "Prioritize features and manage product roadmap",
      "Collaborate with engineering on technical feasibility",
      "Work with marketing on product positioning and launches"
    ],
    requirements: [
      "4+ years of product management experience",
      "Experience with developer tools or technical products",
      "Strong analytical and data-driven decision making",
      "Excellent communication and leadership skills",
      "Understanding of software development processes"
    ]
  },
  {
    id: "devrel-engineer",
    title: "Developer Relations Engineer",
    department: "Marketing",
    type: "Full-time",
    description: "Be the bridge between Kliv and our developer community. Create content, speak at conferences, and help developers succeed with our platform.",
    responsibilities: [
      "Create technical content and documentation",
      "Speak at conferences and developer events",
      "Build relationships with the developer community",
      "Gather feedback and advocate for developer needs",
      "Create demos, tutorials, and sample projects"
    ],
    requirements: [
      "3+ years of software development experience",
      "Strong technical writing and communication skills",
      "Experience with public speaking and content creation",
      "Active in developer communities",
      "Passion for developer tools and education"
    ]
  },
  {
    id: "customer-success",
    title: "Customer Success Manager",
    department: "Customer Success",
    type: "Full-time",
    description: "Help our customers succeed with Kliv. Work with enterprise clients to ensure they get maximum value from our platform.",
    responsibilities: [
      "Onboard new enterprise customers",
      "Provide ongoing support and training",
      "Identify expansion opportunities",
      "Gather customer feedback for product improvements",
      "Develop customer success processes and playbooks"
    ],
    requirements: [
      "3+ years of customer success or account management experience",
      "Experience with B2B SaaS products",
      "Strong problem-solving and communication skills",
      "Technical aptitude to understand developer tools",
      "Experience with CRM and customer success tools"
    ]
  }
];

export function Careers() {
  const { t } = useTranslation();

  const cultureValues = [
    {
      icon: MapPin,
      title: t('careers.culture.remote.title'),
      description: t('careers.culture.remote.description'),
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: TrendingUp,
      title: t('careers.culture.growth.title'),
      description: t('careers.culture.growth.description'),
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: Target,
      title: t('careers.culture.impact.title'),
      description: t('careers.culture.impact.description'),
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: Lightbulb,
      title: t('careers.culture.innovation.title'),
      description: t('careers.culture.innovation.description'),
      gradient: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Header */}
        <div className="border-b border-border bg-muted/30 pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Users className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-primary">{t('careers.badge')}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {t('careers.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('careers.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-sm mb-16">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('careers.intro.paragraph1')}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('careers.intro.paragraph2')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Culture Values */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{t('careers.culture.title')}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cultureValues.map((value, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${value.gradient}`}>
                            <value.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-3">
                            {value.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Job Openings */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{t('careers.openings.title')}</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {t('careers.openings.subtitle')}
                </p>
                
                <Card className="border-0 shadow-sm bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        {t('careers.openings.apply')}
                      </span>
                      <a 
                        href="mailto:careers@kliv.dev" 
                        className="text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        {t('careers.openings.email')}
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t('careers.openings.include')}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <Accordion type="single" collapsible className="w-full">
                    {jobOpenings.map((job) => (
                      <AccordionItem key={job.id} value={job.id}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full pr-4">
                            <div>
                              <h3 className="text-lg font-semibold">{job.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                <span>{job.department}</span>
                                <span>•</span>
                                <span>{job.type}</span>
                                <span>•</span>
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  Remote
                                </span>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                          <div className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed">
                              {job.description}
                            </p>
                            
                            <div>
                              <h4 className="font-semibold mb-3">Key Responsibilities</h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((responsibility, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span className="text-muted-foreground text-sm">{responsibility}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((requirement, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span className="text-muted-foreground text-sm">{requirement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="pt-4 border-t border-border">
                              <Button asChild>
                                <a href={`mailto:careers@kliv.dev?subject=Application for ${job.title}&body=Hi Kliv team,%0D%0A%0D%0AI'm interested in applying for the ${job.title} position. Please find my resume attached.%0D%0A%0D%0ABest regards`}>
                                  Apply for this position
                                </a>
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}