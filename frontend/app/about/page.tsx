import { CheckCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About EmailVerify</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide reliable email verification services to help businesses improve their email deliverability
                  and reduce bounce rates.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-4xl py-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                  <p className="text-muted-foreground">
                    At EmailVerify, we're committed to helping businesses maintain clean, accurate email lists. Our
                    advanced email verification technology ensures that your marketing campaigns reach real, engaged
                    recipients while protecting your sender reputation.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Why Choose Us?</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Real-time Verification</h3>
                        <p className="text-sm text-muted-foreground">
                          Verify emails instantly with our powerful API that checks syntax, domain validity, and mailbox
                          existence.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">High Accuracy</h3>
                        <p className="text-sm text-muted-foreground">
                          Our advanced algorithms provide industry-leading accuracy rates to ensure your email lists are
                          clean.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Easy Integration</h3>
                        <p className="text-sm text-muted-foreground">
                          Simple REST API with comprehensive documentation for quick and easy integration into your
                          applications.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Scalable Solutions</h3>
                        <p className="text-sm text-muted-foreground">
                          From small businesses to enterprise solutions, our plans scale with your needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Our Technology</h2>
                  <p className="text-muted-foreground">
                    We use cutting-edge technology to provide the most accurate email verification results. Our system
                    performs multiple checks including syntax validation, domain verification, MX record checking, and
                    SMTP verification to ensure the highest quality results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
