import { business } from '@/src/config/business';

export type QuoteValues = {
  name: string;
  environment: string;
  location: string;
  measurements: string;
  timeframe: string;
  description: string;
};

export function formatQuoteMessage(values: QuoteValues) {
  return `Olá! Gostaria de solicitar um orçamento de móveis planejados.

Ambiente: ${values.environment}
Localização: ${values.location}
Medidas aproximadas: ${values.measurements || 'Ainda não informadas'}
Prazo: ${values.timeframe}

Meu nome é ${values.name}.${values.description ? `\n\nSobre o projeto: ${values.description}` : ''}

Gostaria de conversar sobre meu projeto.`;
}

export function getWhatsAppUrl(message: string) {
  const phone = business.whatsapp as string;
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return '';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
