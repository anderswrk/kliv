import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-100 via-slate-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
              About Us
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <div className="space-y-12">
            {/* Founder's Note */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Founder's note
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  I've been an engineer since the early 2000s and I've always loved writing code. It's my type of creative work. Some people paint, some write music. I can't do either of those things well. But I can write code well. There's a real joy in taking basic logical building blocks and shape them into something useful and elegant.
                </p>
                <p>
                  That kind of deep, hands-on programming will always have a place.
                  There will always be people who want a stick shift, even when most cars are automatic or EVs that don't even have gears to shift. There are still people who ride horses.
                  Some subset of people will always be passionate about their particular interest even if it might no longer have the same economic value it once did.
                </p>
                <p>
                  The reality is: the bulk of routine software work is moving on.
                  Most of it -- all the work that millions of engineers do every day that don't really require taste or creativity. Shifting data around, building CRUD interfaces -- is already better handled by machines. And that's fine. That's progress.
                </p>
                <p>
                  Kliv is my attempt to build for that future.
                </p>
                <p>
                  The role of the hands-on programmer is fading — not disappearing, but shifting and that's fine.
                </p>
                <p>
                  Let's not get stuck in nostalgia for how things used to be.
                  Let's build what's next.
                </p>
              </div>
            </section>

            {/* What is Kliv */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What is Kliv
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  Kliv is a programmable canvas where AI can build and ship real software — not mockups, not demos, but production-ready code.
                </p>
                <p>
                  We're starting with a focus on the frontend. The current frontier models are great at building with React and Tailwind, so that's what we're using right now.
                </p>
              </div>
            </section>

            {/* Where we're going */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Where we're going
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  We're quickly reaching a point where constructing the frontend of an app or website with AI is a mostly solved problem. The focus is now on enabling more advanced backend functionality to go along with the frontend:
                </p>
                <p>Here's what we're building next:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Background jobs</li>
                  <li>Queues and workers</li>
                  <li>API endpoints</li>
                  <li>Workflows</li>
                  <li>Backend business logic</li>
                  <li>Full data pipelines</li>
                  <li>Permission models</li>
                  <li>Full infrastructure-as-code</li>
                </ul>
                <p>
                  We're quickly paving the road so the AI can assemble more of the stack — in a way that holds up.
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