
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  publishedAt: string;
  slug: string;
  tags: string[];
}

export const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Toronto Housing Market Shows Signs of Recovery After Recent Policy Changes',
    excerpt: 'New provincial housing policies are beginning to show positive effects on Toronto real estate market with increased inventory and stabilizing prices.',
    content: `Toronto's housing market is experiencing a notable shift following the implementation of new provincial housing policies earlier this year. Real estate experts are reporting increased inventory levels and more stable pricing patterns across the Greater Toronto Area.

The new policies, which include streamlined approval processes for new developments and increased density allowances, have encouraged developers to bring more projects to market. This increase in supply is helping to address the chronic housing shortage that has plagued the city for years.

According to recent data from the Toronto Regional Real Estate Board, average home prices have stabilized over the past quarter, with some neighborhoods seeing modest price corrections. First-time homebuyers are particularly benefiting from these changes, with more affordable options becoming available.

Industry analysts suggest that while the market is showing signs of recovery, sustained improvement will depend on continued government support and economic stability. The upcoming federal budget is expected to include additional measures to support affordable housing initiatives across Canada.

Local residents and prospective buyers are cautiously optimistic about these developments, though many emphasize that more work is needed to make housing truly affordable for all Torontonians.`,
    image: 'photo-1486312338219-ce68d2c6f44d',
    author: 'Sarah Chen',
    category: 'Local',
    publishedAt: '2024-03-15T10:00:00Z',
    slug: 'toronto-housing-market-recovery-policy-changes',
    tags: ['Housing', 'Toronto', 'Real Estate', 'Policy']
  },
  {
    id: '2',
    title: 'Canada Announces Major Infrastructure Investment Plan for 2024',
    excerpt: 'Federal government unveils $50 billion infrastructure package focusing on green energy, transportation, and digital connectivity across all provinces.',
    content: `The federal government has announced a comprehensive $50 billion infrastructure investment plan that will span the next five years, with a strong emphasis on sustainable development and digital modernization.

Prime Minister Justin Trudeau unveiled the plan during a press conference in Ottawa, highlighting key areas including renewable energy projects, public transportation upgrades, and enhanced digital infrastructure to support remote work and education.

The investment package includes $20 billion for green energy initiatives, including wind and solar projects across the country. Another $15 billion will be allocated to public transportation improvements, with major upgrades planned for subway systems in Toronto, Vancouver, and Montreal.

Digital infrastructure will receive $10 billion, focusing on expanding high-speed internet access to rural and remote communities across Canada. The remaining $5 billion will support water treatment facilities and other essential services.

Provincial leaders have generally welcomed the announcement, though some have called for more consultation on project priorities. The plan is expected to create thousands of jobs across the country and position Canada as a leader in clean technology.

Opposition parties have raised questions about funding sources and implementation timelines, calling for more detailed budget breakdowns and accountability measures.`,
    image: 'photo-1461749280684-dccba630e2f6',
    author: 'Michael Rodriguez',
    category: 'Canada',
    publishedAt: '2024-03-14T14:30:00Z',
    slug: 'canada-infrastructure-investment-plan-2024',
    tags: ['Infrastructure', 'Government', 'Investment', 'Green Energy']
  },
  {
    id: '3',
    title: 'Global Climate Summit Reaches Historic Agreement on Carbon Reduction',
    excerpt: 'World leaders commit to ambitious new targets for carbon emissions reduction, with Canada playing a key role in negotiations.',
    content: `World leaders have reached a groundbreaking agreement at the Global Climate Summit in Geneva, committing to reduce global carbon emissions by 45% by 2030 compared to 2019 levels.

The agreement, signed by representatives from 195 countries, establishes binding targets for major economies and provides a framework for developing nations to transition to clean energy. Canada played a crucial role in the negotiations, helping to bridge differences between developed and developing countries.

Canadian Environment Minister Steven Guilbeault praised the agreement as "a turning point in our fight against climate change." Canada has committed to exceeding its previous targets, aiming for a 50% reduction in emissions by 2030.

The agreement includes provisions for a global carbon pricing mechanism, technology transfer programs, and a $100 billion annual fund to support climate adaptation in vulnerable countries. Critics argue that the targets, while ambitious, may still fall short of what scientists say is needed to limit global warming to 1.5 degrees Celsius.

Environmental groups have generally welcomed the agreement but stress that implementation will be key. The next phase will involve developing detailed national action plans and monitoring mechanisms to ensure countries meet their commitments.

Business leaders are adapting to the new framework, with many companies announcing accelerated timelines for their own net-zero commitments.`,
    image: 'photo-1470071459604-3b5ec3a7fe05',
    author: 'Emma Thompson',
    category: 'World',
    publishedAt: '2024-03-13T09:15:00Z',
    slug: 'global-climate-summit-historic-agreement-carbon-reduction',
    tags: ['Climate', 'Environment', 'Global', 'Politics']
  },
  {
    id: '4',
    title: 'The Future of Remote Work: A Canadian Perspective',
    excerpt: 'As hybrid work models become the norm, Canadian businesses are reimagining workplace culture and productivity in the post-pandemic era.',
    content: `The landscape of work in Canada has fundamentally changed since 2020, with remote and hybrid work models becoming permanent fixtures in many industries. As we move further into 2024, it's clear that this shift represents more than a temporary pandemic response—it's a reimagining of how Canadians work and live.

Recent surveys indicate that over 60% of Canadian knowledge workers now operate in hybrid arrangements, splitting time between home offices and traditional workplaces. This transition has brought both opportunities and challenges that are reshaping our understanding of productivity, collaboration, and work-life balance.

From an economic perspective, remote work has enabled businesses to access talent pools beyond their immediate geographic areas. Toronto-based companies are now hiring skilled workers from Halifax to Vancouver, while employees are choosing to live in smaller communities with lower costs of living. This geographic flexibility is contributing to a more distributed economy across Canada.

However, the shift isn't without its complexities. Young professionals entering the workforce are finding it challenging to build networks and gain mentorship in virtual environments. Many companies are struggling to maintain their organizational culture when teams are dispersed across different time zones.

The real estate implications are equally significant. Commercial real estate in downtown cores is experiencing unprecedented vacancy rates, while residential markets in smaller cities and rural areas are seeing increased demand. This trend is forcing municipal governments to reconsider urban planning strategies and infrastructure investments.

Looking ahead, successful organizations will be those that can create meaningful connections in hybrid environments while maintaining the flexibility that workers have come to value. The future of work in Canada will likely be defined by intentional choices about when and where collaboration happens most effectively.`,
    image: 'photo-1488590528505-98d2b5aba04b',
    author: 'David Kim',
    category: 'Opinion',
    publishedAt: '2024-03-12T16:45:00Z',
    slug: 'future-remote-work-canadian-perspective',
    tags: ['Remote Work', 'Opinion', 'Business', 'Canada']
  },
  {
    id: '5',
    title: 'Toronto International Film Festival Announces 2024 Lineup',
    excerpt: 'TIFF 2024 promises to be the biggest yet, featuring premieres from acclaimed directors and emerging Canadian talent.',
    content: `The Toronto International Film Festival (TIFF) has unveiled its highly anticipated 2024 lineup, featuring over 300 films from 85 countries, including several world premieres and a strong showcase of Canadian cinema.

This year's festival, running from September 5-15, will open with the world premiere of "Northern Lights," a Canadian drama directed by Alanis Obomsawin that explores Indigenous rights and environmental protection in the Arctic. The closing film will be "The Mapmaker's Daughter," starring Ryan Gosling and directed by Denis Villeneuve.

TIFF CEO Cameron Bailey announced that 40% of this year's selections are directed by women, and 30% feature directors from underrepresented communities. The festival will also debut a new section called "Digital Frontiers," focusing on films created using virtual production techniques and AI-assisted storytelling.

Notable premieres include new works from Christopher Nolan, Greta Gerwig, and Chloé Zhao, as well as several high-profile documentaries addressing climate change, social justice, and technological innovation. The festival will also feature a retrospective celebrating 50 years of Canadian cinema.

Industry professionals are particularly excited about the expanded market programs, which will facilitate international co-productions and help Canadian filmmakers connect with global distributors. The festival expects to attract over 400,000 attendees and contribute approximately $200 million to Toronto's economy.

Tickets for TIFF 2024 go on sale to members on August 1st, with public sales beginning August 8th. The festival continues to adapt to changing viewing habits by offering both in-person and virtual screening options for select films.`,
    image: 'photo-1581091226825-a6a2a5aee158',
    author: 'Lisa Park',
    category: 'Events',
    publishedAt: '2024-03-11T11:20:00Z',
    slug: 'toronto-international-film-festival-2024-lineup',
    tags: ['TIFF', 'Film', 'Toronto', 'Events', 'Culture']
  },
  {
    id: '6',
    title: 'CN Tower Celebrates 50 Years with Special Light Show and Events',
    excerpt: 'Toronto\'s iconic landmark marks its golden anniversary with a month-long celebration featuring special illuminations and community events.',
    content: `The CN Tower, Toronto's most recognizable landmark, is celebrating its 50th anniversary with a spectacular month-long celebration that began this week. The iconic tower, which opened to the public in March 1974, has been illuminated with special golden lights every evening to mark this milestone.

The celebration includes daily light shows synchronized to Canadian music, featuring works by artists like Leonard Cohen, Joni Mitchell, and Drake. Each show tells the story of Canada's cultural evolution over the past five decades, projecting images and colors that represent different eras and achievements.

CN Tower officials have also announced special anniversary tours that take visitors behind the scenes to areas normally closed to the public, including the broadcasting equipment levels and maintenance facilities. These tours provide insight into the tower's role as a communications hub and its engineering marvels.

The anniversary celebration has attracted visitors from around the world, with hotel bookings in downtown Toronto seeing a 35% increase compared to the same period last year. Local businesses are benefiting from the increased tourism, with many restaurants and shops offering special CN Tower-themed promotions.

Mayor Olivia Chow praised the tower's contribution to Toronto's identity and economy over the past five decades. "The CN Tower has been more than just a landmark—it's been a symbol of Toronto's growth, innovation, and place on the world stage," she said during the anniversary kick-off ceremony.

The celebration will culminate on March 26th with a massive fireworks display visible throughout the GTA, accompanied by performances from Canadian artists on the tower's grounds. The event is expected to draw over 100,000 spectators to the downtown core.`,
    image: 'photo-1466442929976-97f336a657be',
    author: 'James Wilson',
    category: 'Local',
    publishedAt: '2024-03-10T13:00:00Z',
    slug: 'cn-tower-50th-anniversary-celebration',
    tags: ['CN Tower', 'Toronto', 'Anniversary', 'Tourism']
  }
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return sampleArticles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return sampleArticles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
};

export const getRelatedArticles = (currentArticleId: string, category: string, limit: number = 3): Article[] => {
  return sampleArticles
    .filter(article => article.id !== currentArticleId && article.category === category)
    .slice(0, limit);
};
