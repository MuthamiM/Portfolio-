export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  content: string;
  link: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "news-1",
    title: "Kenyan AI Startup BasiGo Secures $10M to Expand Electric Bus Fleet",
    source: "Techweez",
    date: "June 11, 2026",
    content: "BasiGo, the pioneer of electric public transit in Kenya, has announced a new $10 million funding round. The capital will be utilized to expand its fleet of electric buses in Nairobi and Kigali, accelerating the transition to clean energy public transport in East Africa. The startup has already logged over 1.5 million kilometers and transported over 2 million passengers locally.",
    link: "https://techweez.com",
  },
  {
    id: "news-2",
    title: "Safaricom & Google Launch Android PELETE in East Africa",
    source: "Gadgets Africa",
    date: "June 10, 2026",
    content: "Safaricom, in partnership with Google, has officially launched the Android PELETE initiative. This program aims to significantly accelerate smartphone adoption in rural Kenya by offering high-quality, 4G-enabled devices at highly subsidized prices starting from KES 3,500. The initiative includes flexible daily payment models powered by Lipa Mdogo Mdogo.",
    link: "https://gadgetsafrica.com",
  },
  {
    id: "news-3",
    title: "Nairobi Developer Community Hits Record 100K Active Members",
    source: "Techpoint Africa",
    date: "June 08, 2026",
    content: "Nairobi's tech ecosystem continues to solidify its position as the 'Silicon Savannah'. New data reveals that the local software developer community has crossed 100,000 active members across various hubs and open-source groups. The growth is fueled by an influx of foreign investment, tech bootcamps, and a rising demand for local engineering talent in AI and fintech.",
    link: "https://techpoint.africa",
  },
  {
    id: "news-4",
    title: "OpenAI Rolls Out Advanced Swahili Support for GPT-4.5",
    source: "TechCrunch",
    date: "June 05, 2026",
    content: "OpenAI has announced a major update to its multilingual model capabilities, featuring advanced native Swahili and regional East African dialect understanding. The release marks a major step forward in localization, allowing local developers to build conversational AI applications with significantly higher accuracy and nuance.",
    link: "https://techcrunch.com",
  },
];
