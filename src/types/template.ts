export interface TemplateData {
  title: string;
  subtitle: string;
  description: string;
  phone?: string;
  email?: string;
  website?: string;
  fontSize?: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
  };
  image?: string;
  images?: string[];
}
