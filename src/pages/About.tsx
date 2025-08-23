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
          <div className="max-w-4xl mx-auto space-y-20">
            
            {/* Founder's Note */}
            <section className="relative">
              <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full opacity-60"></div>
              <div className="pl-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 flex items-center">
                  Founder's note
                  <span className="ml-4 w-12 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></span>
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                  <p className="text-lg leading-relaxed">
                    I've been an engineer since the early 2000s and I've always loved writing code. It's my type of creative work. Some people paint, some write music. I can't do either of those things well. But I can write code well. There's a real joy in taking basic logical building blocks and shape them into something useful and elegant.
                  </p>
                  <p className="leading-relaxed">
                    That kind of deep, hands-on programming will always have a place.
                    There will always be people who want a stick shift, even when most cars are automatic or EVs that don't even have gears to shift. There are still people who ride horses.
                    Some subset of people will always be passionate about their particular interest even if it might no longer have the same economic value it once did.
                  </p>
                  <p className="leading-relaxed">
                    The reality is: the bulk of routine software work is moving on.
                    Most of it -- all the work that millions of engineers do every day that don't really require taste or creativity. Shifting data around, building CRUD interfaces -- is already better handled by machines. And that's fine. That's progress.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-6 border-l-4 border-blue-500 my-8">
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-0">
                      Kliv is my attempt to build for that future.
                    </p>
                  </div>
                  <p className="leading-relaxed">
                    The role of the hands-on programmer is fading — not disappearing, but shifting and that's fine.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed mb-0">
                      Let's not get stuck in nostalgia for how things used to be.<br/>
                      Let's build what's next.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What is Kliv */}
            <section className="relative">
              <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full opacity-60"></div>
              <div className="pl-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 flex items-center">
                  What is Kliv
                  <span className="ml-4 w-12 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></span>
                </h2>
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                    <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">
                      Kliv is a programmable canvas where AI can build and ship real software — not mockups, not demos, but production-ready code.
                    </p>
                    <p className="leading-relaxed">
                      We're starting with a focus on the frontend. The current frontier models are great at building with React and Tailwind, so that's what we're using right now.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Where we're going */}
            <section className="relative">
              <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-pink-500 to-orange-600 rounded-full opacity-60"></div>
              <div className="pl-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 flex items-center">
                  Where we're going
                  <span className="ml-4 w-12 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></span>
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                  <p className="leading-relaxed">
                    We're quickly reaching a point where constructing the frontend of an app or website with AI is a mostly solved problem. The focus is now on enabling more advanced backend functionality to go along with the frontend:
                  </p>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Here's what we're building next</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Background jobs',
                        'Queues and workers', 
                        'API endpoints',
                        'Workflows',
                        'Backend business logic',
                        'Full data pipelines',
                        'Permission models',
                        'Full infrastructure-as-code'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed">
                    We're quickly paving the road so the AI can assemble more of the stack — in a way that holds up.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Closing Statement */}
        <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  This isn't no-code. This isn't low-code.
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  It's post-code. A new abstraction layer.
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">We're not replacing engineers. We're replacing repetition.</span><br />
                    You still bring the vision. You still decide what matters.<br />
                    But now, you don't have to do all the typing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}