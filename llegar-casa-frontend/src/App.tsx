import { ContentProvider } from './providers/ContentProvider';

import Wrapper from './components/Layout/Wrapper';
import Hero from './components/Hero/Hero';
import WhyUseSection from './components/WhyUse/WhyUseSection';

import { ConsultationSection } from './components/Consultation/ConsultationSection';
import FAQSection from './components/FAQ/FAQSection';

function App() {
	return (
		<ContentProvider>
			<Wrapper>
				<Hero />
				<WhyUseSection />
				<ConsultationSection id="consultation" />
				<FAQSection />
			</Wrapper>
		</ContentProvider>
	);
}

export default App;
