import { motion } from 'framer-motion'
import { ElitePlanCard } from '@/components/ui/ElitePlanCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { staggerContainer } from '@/animations/variants'
import { useLanguage } from '@/contexts/LanguageContext'

const highlights = [
  { id: 'pillars', imageUrl: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000842/GSFC_20171208_Archive_e000842~medium.jpg' },
  { id: 'first-moon', imageUrl: 'https://images-assets.nasa.gov/image/as11-40-5903/as11-40-5903~medium.jpg' },
  { id: 'blue-marble', imageUrl: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001386/GSFC_20171208_Archive_e001386~medium.jpg' },
  { id: 'webb-deep', imageUrl: 'https://images-assets.nasa.gov/image/webb_first_deep_field/webb_first_deep_field~medium.jpg' },
]

export default function NasaHighlights() {
  const { t } = useLanguage()
  return (
    <motion.section id="nasa-highlights" className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title={t('nasahighlights.title')}
          subtitle={t('nasahighlights.subtitle')}
          tag={t('nasahighlights.tag')}
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {highlights.map((item) => (
            <ElitePlanCard
              key={item.id}
              imageUrl={item.imageUrl}
              title={t(`nasahighlights.item.${item.id}.title`)}
              subtitle={t(`nasahighlights.item.${item.id}.subtitle`)}
              description={t(`nasahighlights.item.${item.id}.description`)}
              highlights={[0,1,2].map((i) => t(`nasahighlights.item.${item.id}.highlight.${i}`))}
              onAction={() => window.open('https://www.nasa.gov/images/', '_blank', 'noopener,noreferrer')}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
