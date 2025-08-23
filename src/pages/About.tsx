import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-gray-100 dark:via-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
                About Kliv
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Building the future of software development
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Founder's Note */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">founder's note</h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                <p>
                  I've been an engineer since the early 2000s. I've always loved writing code — not just for what it enables, but for what it is. It's creative. Some people paint, some write music. I build things from code. There's a real joy in taking basic logical building blocks and shaping them into something useful, elegant, even beautiful.
                </p>
                <p>
                  That kind of deep, hands-on programming will always have a place.<br/>
                  There will always be people who want to drive stick, even if automatics have taken over.<br/>
                  There are still people who ride horses — not because it's efficient, but because it's meaningful.<br/>
                  Craft matters. Passion matters.
                </p>
                <p>
                  But the reality is: the bulk of routine software work is moving on.<br/>
                  Most of it — the wiring, the glue, the boilerplate, the thousand small decisions that don't really require taste or creativity — is already better handled by machines. And that's not a tragedy. That's progress.
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Kliv is my attempt to build for that future.
                </p>
                <p>
                  A canvas and a compute layer where the AI can handle the routine work — not by hiding the code, but by actually writing it. Systems that scale. Interfaces that work. Deployments that go out cleanly. You don't micromanage every bracket. You direct the result.
                </p>
                <p>
                  The role of the hands-on programmer is fading — not disappearing, but shifting.<br/>
                  We're heading into the era of the software art director.<br/>
                  The person with taste, vision, and intent — and the tools to see it through.
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Let's not get stuck in nostalgia for how things used to be.<br/>
                  Let's build what's next.
                </p>
              </div>
            </section>

            {/* What is Kliv */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">what is kliv</h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                <p>
                  Kliv is a programmable canvas where AI can build and ship real software — not mockups, not demos, but production-ready code.
                </p>
                <p>
                  It starts with full-stack websites and apps. React, Vite, Tailwind, Supabase, custom domains, translations, SEO — all wired up through a conversation. You guide the process, review the diffs, and refine the result. The AI doesn't just generate blobs of code — it builds with structure and intent. Every project lives in a version-controlled file system. You can jump in and code, edit, or just direct.
                </p>
                <p>
                  Everything updates live.<br/>
                  The build system is reactive.<br/>
                  It's fast, inspectable, and fully yours.
                </p>
              </div>
            </section>

            {/* Where we're going */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">where we're going</h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                <p>
                  Today, Kliv builds frontends. Tomorrow, it builds systems.
                </p>
                <p>The roadmap is about unlocking deeper capabilities:</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>background jobs</li>
                  <li>queues and workers</li>
                  <li>API endpoints</li>
                  <li>workflows</li>
                  <li>backend business logic</li>
                  <li>full data pipelines</li>
                  <li>permission models</li>
                  <li>full infrastructure-as-code</li>
                </ul>
                <p>
                  We're paving the road so the AI can assemble more of the stack — not in a fragile way, but in a way that holds up. The goal is not to fake software with pretty UI. It's to build real systems using real components, wired together by intelligent composition.
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  This isn't no-code. This isn't low-code.<br/>
                  It's post-code. A new abstraction layer.
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  We're not replacing engineers. We're replacing repetition.<br/>
                  You still bring the vision.<br/>
                  You still decide what matters.<br/>
                  But now, you don't have to do all the typing.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}