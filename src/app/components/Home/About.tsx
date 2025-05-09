"use client"
import ScrollAnimationWrapper from '@/app/ui/ScrollAnimationWrapper'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/app/hooks/useTranslation'
import { useLanguage } from '@/app/providers/LanguageProvider'

function About() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <ScrollAnimationWrapper>
      <section className="py-20 mt-14 sm:mt16 lg:mt-0">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 grid lg:grid-cols-2 lg:items-center gap-10">
          <div className="flex flex-col space-y-8 sm:space-y-10 lg:items-center text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto">
            {isRTL ? (
              <h1 className="font-semibold tracking-wide leading-[1.4] text-slate-200 dark:text-white text-3xl sm:text-4xl lg:text-5xl text-right">
                عائد استثمار لا مثيل له مع{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757] block pt-1 leading-[1.3]">
                  التسويق المدعوم بالذكاء الاصطناعي
                </span>
              </h1>
            ) : (
              <h1 className="font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
                {t('home.about.title')} <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">{t('home.about.subtitle')}</span>
              </h1>
            )}
            <p className={`flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none ${isRTL ? 'text-right' : ''}`}>
              {t('home.about.description')}
            </p>
            <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full ${isRTL ? 'lg:justify-end' : ''}`}>
              <Link href="/schedule-a-meeting" className="px-6 font-semibold items-center h-12 rounded-md bg-gradient-to-br from-secondaryColor from-35% via-[#AD8253] via-35% to-[#8C5C28] text-white duration-300 ease-linear flex justify-center w-full sm:w-auto hover:bg-[#222222] hover:text-secondaryColor">
                {t('nav.scheduleAMeeting')}
              </Link>
              <Link href="/our-work" className="px-6 font-semibold items-center h-12 rounded-md text-secondaryColor border border-[#1c1c1c] dark:border-gray-800 dark:text-white bg-[#222222] dark:bg-gray-900 duration-300 ease-linear flex justify-center w-full sm:w-auto hover:bg-secondaryColor hover:text-[#222222]">
                {t('nav.ourWork')}
              </Link>
            </div>
            <div className={`mt-5 flex items-center justify-center flex-wrap gap-4 lg:justify-start w-full ${isRTL ? 'lg:justify-end' : ''}`}>
              <Link href="#" target="_blank" rel='noreferer'>
                <Image width={600} height={120} src="/logo-partner-google.png" alt={t('home.about.partners.google')} className="h-10 w-auto dark:grayscale" />
              </Link>
              <Link href="#" target="_blank" rel='noreferer'>
                <Image width={600} height={120} src="/logo-partner-meta.png" alt={t('home.about.partners.meta')} className="h-10 w-auto dark:grayscale" />
              </Link>
              <Link href="#" target="_blank" rel='noreferer'>
                <Image width={600} height={120} src="/logo-partner-hubspot.png" alt={t('home.about.partners.hubspot')} className="h-10 w-auto dark:grayscale" />
              </Link>
              <Link href="#" target="_blank" rel='noreferer'>
                <Image width={600} height={120} src="/logo-partner-semrush.png" alt={t('home.about.partners.semrush')} className="h-10 w-auto dark:grayscale" />
              </Link>
            </div>
          </div>
          <div className="flex aspect-square lg:aspect-auto lg:h-[35rem] relative">
            <div className="w-3/5 h-[80%] rounded-3xl overflow-clip border-4 border-secondaryColor dark:border-gray-950 z-30">
              <Image src="/dubai-business.jpg" alt={t('home.about.images.dubaiBusiness')} width={1300} height={1300} className="w-full h-full object-cover z-30" />
            </div>
            <div className="absolute right-0 bottom-0 h-[calc(100%-50px)] w-4/5 rounded-3xl overflow-clip border-4 border-secondaryColor dark:border-gray-800 z-10">
              <Image src="/business-performance.jpg" alt={t('home.about.images.businessPerformance')} height={1300} width={1300} className="z-10 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimationWrapper>
  )
}

export default About