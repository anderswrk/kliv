
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Globe, Github, Brain, Code, History, Smartphone } from 'lucide-react';

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Server,
      title: "Hosting Included",
      description: "No servers to manage, no deployment headaches. Your app goes live instantly with lightning-fast global CDN.",
      gradient: 'from-emerald-500 to-emerald-600',
      delay: '0ms'
    },
    {
      icon: Globe,
      title: "Your Own Domain",
      description: "Connect your custom domain with one click. Professional URLs that reflect your brand.",
      gradient: 'from-blue-500 to-blue-600',
      delay: '100ms'
    },
    {
      icon: Github,
      title: "GitHub Sync",
      description: "Keep your source code safe. Enable GitHub syncing to maintain full ownership and version history.",
      gradient: 'from-purple-500 to-purple-600',
      delay: '200ms'
    },
    {
      icon: Brain,
      title: "AI Builds For You",
      description: "Describe your vision and watch it come to life. Our AI understands your requirements and creates production-ready code.",
      gradient: 'from-orange-500 to-orange-600',
      delay: '300ms'
    },
    {
      icon: Code,
      title: "Code & Preview",
      description: "Edit your source code directly if you want. See results instantly with live preview - no refresh needed.",
      gradient: 'from-cyan-500 to-cyan-600',
      delay: '400ms'
    },
    {
      icon: History,
      title: "Time Travel",
      description: "Every change is snapshotted. Made a mistake? Go back to any previous version with one click.",
      gradient: 'from-pink-500 to-pink-600',
      delay: '500ms'
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Built responsive from the ground up. Your apps look perfect on every device, every time.",
      gradient: 'from-indigo-500 to-indigo-600',
      delay: '600ms'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
            ✨ Everything You Need
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
            Build Amazing Apps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stop wrestling with deployment pipelines and build configurations. Kliv handles the technical complexity so you can focus on creating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:scale-[1.02] hover:-translate-y-2"
              style={{ animationDelay: feature.delay }}
            >
              <CardContent className="p-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white dark:border-slate-800"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-white dark:border-slate-800"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full border-2 border-white dark:border-slate-800"></div>
            </div>
            <span>Trusted by thousands of developers worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
