import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Privacy Policy</h1>
                  <p className="text-muted-foreground">Last updated: June 4, 2025</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Information We Collect</h2>
                    <p className="text-muted-foreground">
                      We collect information you provide directly to us, such as when you create an account, use our
                      services, or contact us for support.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                    <p className="text-muted-foreground">
                      We use the information we collect to provide, maintain, and improve our services, process
                      transactions, and communicate with you.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Information Sharing</h2>
                    <p className="text-muted-foreground">
                      We do not sell, trade, or otherwise transfer your personal information to third parties without
                      your consent, except as described in this policy.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Data Security</h2>
                    <p className="text-muted-foreground">
                      We implement appropriate security measures to protect your personal information against
                      unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Your Rights</h2>
                    <p className="text-muted-foreground">
                      You have the right to access, update, or delete your personal information. You may also opt out of
                      certain communications from us.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Contact Us</h2>
                    <p className="text-muted-foreground">
                      If you have any questions about this Privacy Policy, please contact us at privacy@emailverify.com.
                    </p>
                  </div>
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
