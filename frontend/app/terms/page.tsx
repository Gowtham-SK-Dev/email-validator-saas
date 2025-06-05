import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Terms and Conditions</h1>
                  <p className="text-muted-foreground">Last updated: June 4, 2025</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground">
                      By accessing and using EmailVerify's services, you accept and agree to be bound by the terms and
                      provision of this agreement.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">2. Use License</h2>
                    <p className="text-muted-foreground">
                      Permission is granted to temporarily download one copy of EmailVerify's materials for personal,
                      non-commercial transitory viewing only.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">3. Disclaimer</h2>
                    <p className="text-muted-foreground">
                      The materials on EmailVerify's website are provided on an 'as is' basis. EmailVerify makes no
                      warranties, expressed or implied, and hereby disclaims and negates all other warranties including
                      without limitation, implied warranties or conditions of merchantability, fitness for a particular
                      purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">4. Limitations</h2>
                    <p className="text-muted-foreground">
                      In no event shall EmailVerify or its suppliers be liable for any damages (including, without
                      limitation, damages for loss of data or profit, or due to business interruption) arising out of
                      the use or inability to use the materials on EmailVerify's website, even if EmailVerify or an
                      authorized representative has been notified orally or in writing of the possibility of such
                      damage.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">5. Accuracy of Materials</h2>
                    <p className="text-muted-foreground">
                      The materials appearing on EmailVerify's website could include technical, typographical, or
                      photographic errors. EmailVerify does not warrant that any of the materials on its website are
                      accurate, complete, or current.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">6. Links</h2>
                    <p className="text-muted-foreground">
                      EmailVerify has not reviewed all of the sites linked to our website and is not responsible for the
                      contents of any such linked site. The inclusion of any link does not imply endorsement by
                      EmailVerify of the site.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">7. Modifications</h2>
                    <p className="text-muted-foreground">
                      EmailVerify may revise these terms of service for its website at any time without notice. By using
                      this website, you are agreeing to be bound by the then current version of these terms of service.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">8. Governing Law</h2>
                    <p className="text-muted-foreground">
                      These terms and conditions are governed by and construed in accordance with the laws of India and
                      you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
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
