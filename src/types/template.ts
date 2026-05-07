export interface FieldFontSizes {
  name?: number;
  jobTitle?: number;
  company?: number;
  contact?: number;
}

export interface TemplateData {
  title: string;
  subtitle: string;
  description: string;
  phone?: string;
  email?: string;
  website?: string;
  fontSize?: number;
  fieldFontSizes?: FieldFontSizes;
  eventLabel?: string;
  senderName?: string;
  congratsText?: string;
  dedicationText?: string;
  date?: string;
  location?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
  };
  image?: string;
  images?: string[];
  logo?: string;
  logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  logoSize?: number;
}
