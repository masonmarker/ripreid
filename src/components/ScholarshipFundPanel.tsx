import { ChevronDown, GraduationCap } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

export default function ScholarshipFundPanel() {
  return (
    <AnimatedSection delay={0.5}>
      <div className="bg-warmstone-50 rounded-2xl p-8 md:p-12 text-center border border-warmstone-300/60">
        <GraduationCap className="w-10 h-10 mx-auto mb-4 text-forest-600" />
        <h3 className="text-2xl md:text-3xl font-serif text-forest-800 mb-4">
          Reid&apos;s Scholarship Fund
        </h3>
        <p className="text-forest-700 leading-relaxed max-w-2xl mx-auto mb-6">
          A scholarship fund has been established in Reid&apos;s memory at Sherando
          High School, where he graduated. Contributions help carry his spirit of
          generosity forward to future Warriors.
        </p>

        {/* Native <details> rather than a JS toggle: the donation instructions
            stay reachable even before hydration (or if the bundle never
            arrives on a slow phone), which is the same reason the rest of the
            page avoids JS-gated content. */}
        <details className="group max-w-md mx-auto">
          <summary className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-800 text-sm tracking-[0.15em] uppercase font-medium cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
            How to donate
            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
          </summary>

          <div className="mt-6 bg-warmstone-100 rounded-xl p-6 text-forest-700 leading-relaxed">
            <p className="mb-4">
              Please make checks payable to{' '}
              <strong>Sherando High School</strong> and mail to:
            </p>
            <address className="not-italic font-medium text-forest-800 mb-4">
              Sherando High School<br />
              Attn: Bookkeeper<br />
              185 S Warrior Dr.<br />
              Stephens City, VA 22655
            </address>
            <p>
              Write <strong>&ldquo;Reid Marker&rdquo;</strong> on the memo line
              of the check.
            </p>
          </div>
        </details>
      </div>
    </AnimatedSection>
  )
}
