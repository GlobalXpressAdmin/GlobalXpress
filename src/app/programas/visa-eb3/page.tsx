import React from 'react';
import EB3Section from '@/components/EB3Section';
import EB3Requirements from '@/components/EB3Requirements';
import VisaProcess from '@/components/VisaProcess';
import EligibilitySection from '@/components/EligibilitySection';
import ConyugeSection from '@/components/ConyugeSection';
import FamiliasMigrantesSection from '../../../components/FamiliasMigrantesSection';
import FormacionSliderSection from '../../../components/FormacionSliderSection';
import EB3Benefits from '@/components/EB3Benefits';

export default function VisaEB3() {
  return (
    <main>
      <EB3Section />
      <VisaProcess />
      <EB3Requirements />
      <EB3Benefits />
      <EligibilitySection />
      <ConyugeSection />
      <FamiliasMigrantesSection />
      <FormacionSliderSection />
    </main>
  );
} 