import { Code, Search, PenTool, MessageSquare, MonitorSmartphone, ShieldCheck, BarChart, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  process: ProcessStep[];
}

export const services: Service[] = [
  {
    title: 'Website Development',
    description: 'Custom websites that are fast, secure, and built to convert visitors into customers.',
    icon: Code,
    features: ['Responsive Design', 'SEO Optimization', 'Custom Functionality', 'Performance Focused'],
    process: [
      {
        title: 'Discovery & Planning',
        description: 'We analyze your requirements and create a detailed project roadmap.'
      },
      {
        title: 'Design & Prototyping',
        description: 'Creating wireframes and interactive prototypes for your approval.'
      },
      {
        title: 'Development',
        description: 'Building your website with clean, efficient code and modern technologies.'
      },
      {
        title: 'Testing & Launch',
        description: 'Rigorous testing and smooth deployment of your website.'
      }
    ]
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Drive organic traffic and improve your online visibility with our proven SEO strategies.',
    icon: Search,
    features: ['Keyword Research', 'Content Strategy', 'Link Building', 'Analytics & Reporting'],
    process: [
      {
        title: 'Audit & Analysis',
        description: 'Comprehensive analysis of your current SEO performance.'
      },
      {
        title: 'Strategy Development',
        description: 'Creating a customized SEO strategy based on your goals.'
      },
      {
        title: 'Implementation',
        description: 'Executing SEO optimizations and content improvements.'
      },
      {
        title: 'Monitoring & Optimization',
        description: 'Continuous monitoring and refinement of SEO strategies.'
      }
    ]
  },
  {
    title: 'Branding & Strategy',
    description: 'Create a memorable brand identity that resonates with your target audience.',
    icon: PenTool,
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
    process: [
      {
        title: 'Brand Discovery',
        description: 'Understanding your brand values, vision, and target audience.'
      },
      {
        title: 'Strategy Development',
        description: 'Creating a comprehensive brand strategy and positioning.'
      },
      {
        title: 'Design & Creation',
        description: 'Developing visual elements and brand materials.'
      },
      {
        title: 'Implementation',
        description: 'Rolling out your new brand identity across all channels.'
      }
    ]
  },
  {
    title: 'Content & Social Media',
    description: 'Engage your audience with compelling content and social media management.',
    icon: MessageSquare,
    features: ['Content Creation', 'Social Media Management', 'Community Building', 'Engagement Strategy'],
    process: [
      {
        title: 'Content Strategy',
        description: 'Developing a comprehensive content and social media strategy.'
      },
      {
        title: 'Content Creation',
        description: 'Creating engaging, brand-aligned content for various platforms.'
      },
      {
        title: 'Community Management',
        description: 'Active engagement with your audience and community building.'
      },
      {
        title: 'Analytics & Optimization',
        description: 'Monitoring performance and optimizing content strategy.'
      }
    ]
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    icon: MonitorSmartphone,
    features: ['iOS & Android', 'Cross-platform', 'UI/UX Design', 'App Store Optimization'],
    process: [
      {
        title: 'Requirements Analysis',
        description: 'Understanding your app requirements and target platform needs.'
      },
      {
        title: 'UI/UX Design',
        description: 'Creating intuitive and engaging user interfaces and experiences.'
      },
      {
        title: 'Development & Testing',
        description: 'Building and testing your app across multiple platforms.'
      },
      {
        title: 'Launch & Optimization',
        description: 'App store submission and post-launch optimization.'
      }
    ]
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your digital assets with our comprehensive security solutions.',
    icon: ShieldCheck,
    features: ['Security Audits', 'SSL Certificates', 'Data Protection', 'Regular Monitoring'],
    process: [
      {
        title: 'Security Assessment',
        description: 'Comprehensive evaluation of your current security posture.'
      },
      {
        title: 'Strategy Development',
        description: 'Creating a tailored security implementation plan.'
      },
      {
        title: 'Implementation',
        description: 'Deploying security measures and protection systems.'
      },
      {
        title: 'Monitoring & Updates',
        description: 'Continuous security monitoring and regular updates.'
      }
    ]
  },
  {
    title: 'Analytics & Reporting',
    description: 'Make data-driven decisions with our detailed analytics and reporting services.',
    icon: BarChart,
    features: ['Custom Dashboards', 'Performance Metrics', 'User Behavior', 'Conversion Tracking'],
    process: [
      {
        title: 'Requirements Gathering',
        description: 'Understanding your analytics needs and KPIs.'
      },
      {
        title: 'Setup & Integration',
        description: 'Implementing analytics tools and tracking systems.'
      },
      {
        title: 'Dashboard Creation',
        description: 'Building custom dashboards for your specific needs.'
      },
      {
        title: 'Analysis & Insights',
        description: 'Regular reporting and actionable insights delivery.'
      }
    ]
  },
  {
    title: 'Digital Transformation',
    description: 'Transform your business processes with cutting-edge digital solutions.',
    icon: Rocket,
    features: ['Process Automation', 'Cloud Solutions', 'Digital Strategy', 'Technology Integration'],
    process: [
      {
        title: 'Digital Assessment',
        description: 'Evaluating current processes and transformation opportunities.'
      },
      {
        title: 'Strategy Planning',
        description: 'Developing a comprehensive digital transformation roadmap.'
      },
      {
        title: 'Implementation',
        description: 'Executing the transformation strategy across your organization.'
      },
      {
        title: 'Training & Support',
        description: 'Ensuring smooth adoption and ongoing support.'
      }
    ]
  }
];
