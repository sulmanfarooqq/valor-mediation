// services/chatbot.js
function scoreIntent(message, keywords) {
  const lower = message.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (lower.includes(kw)) score++;
  }
  return score;
}

const intents = [
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon'],
    response: "Hello! I'm the Valor Mediation assistant. How can I help you today? You can ask about our services, costs, process, locations, or schedule a free consultation."
  },
  {
    name: 'services_overview',
    keywords: ['services', 'offer', 'what do you do', 'mediation services', 'types', 'practice areas'],
    response: "We offer professional mediation services for:\n• Business & Commercial\n• Family & Relationship\n• Workplace & Employment\n• Legal System & Court-Connected\n• Real Estate & Property\n• Personal Injury & Insurance\n\nAll sessions are conducted securely via Zoom. Which area would you like to know more about?"
  },
  {
    name: 'business_mediation',
    keywords: ['business', 'commercial', 'contract', 'partnership', 'vendor', 'company', 'corporate', 'franchise'],
    response: "**Business & Commercial Mediation** – We resolve contract disputes, partnership conflicts, vendor issues, and more. Confidential, cost-effective, and preserves business relationships. All sessions via Zoom. Would you like a free consultation?"
  },
  {
    name: 'family_mediation',
    keywords: ['family', 'divorce', 'child custody', 'parenting', 'separation', 'marital', 'co-parenting', 'elder care'],
    response: "**Family & Relationship Mediation** – We assist with divorce, child custody, parenting plans, marital disputes, and elder care decisions. Compassionate, confidential, and avoids court. Need more details?"
  },
  {
    name: 'workplace_mediation',
    keywords: ['workplace', 'employment', 'employee', 'hr', 'harassment', 'discrimination', 'wrongful termination', 'team conflict'],
    response: "**Workplace & Employment Mediation** – We resolve employer-employee disputes, harassment claims, and team conflicts. Saves time, money, and preserves workplace harmony. All sessions via Zoom."
  },
  {
    name: 'legal_mediation',
    keywords: ['court', 'court-ordered', 'legal', 'litigation', 'pre-litigation', 'small claims', 'civil'],
    response: "**Legal System & Court-Connected Mediation** – We assist with court-ordered cases and pre-litigation disputes. Faster and cheaper than trial. Agreements are legally binding (MSA)."
  },
  {
    name: 'real_estate_mediation',
    keywords: ['real estate', 'property', 'landlord', 'tenant', 'hoa', 'boundary', 'construction', 'title'],
    response: "**Real Estate & Property Mediation** – We handle landlord-tenant disputes, HOA conflicts, boundary disagreements, and construction issues. Avoid court – settle quickly and privately."
  },
  {
    name: 'personal_injury_mediation',
    keywords: ['personal injury', 'insurance', 'auto accident', 'car accident', 'slip and fall', 'workers comp', 'claim', 'settlement'],
    response: "**Personal Injury & Insurance Mediation** – We settle auto accidents, premises liability, workers' comp, and insurance disputes. Faster and less stressful than litigation. Confidential and via Zoom."
  },
  {
    name: 'cost',
    keywords: ['cost', 'price', 'fee', 'rates', 'how much', 'expensive', 'affordable', 'pricing'],
    response: "Mediation is much more cost-effective than litigation. We offer a free initial consultation to discuss your situation and provide a clear quote. Call 817-908-4070 or email rex@valormediation.com."
  },
  {
    name: 'process',
    keywords: ['process', 'how does it work', 'steps', 'what happens', 'procedure', 'what to expect'],
    response: "**Mediation Process:**\n1. Free consultation – we discuss your needs.\n2. Schedule a Zoom session.\n3. We facilitate open communication.\n4. If an agreement is reached, we draft a legally binding Mediation Settlement Agreement (MSA).\nMost disputes resolved in 1-3 sessions."
  },
  {
    name: 'zoom',
    keywords: ['zoom', 'virtual', 'online', 'remote', 'video', 'from home'],
    response: "All sessions are conducted securely via Zoom. You can participate from anywhere – no travel required. We'll send you a link before your session."
  },
  {
    name: 'binding',
    keywords: ['binding', 'msa', 'enforceable', 'legal agreement', 'contract', 'settlement agreement'],
    response: "Yes, any agreement reached in mediation is documented in a Mediation Settlement Agreement (MSA). It is a legally binding contract enforceable in court."
  },
  {
    name: 'locations',
    keywords: ['locations', 'where', 'cities', 'texas', 'dallas', 'fort worth', 'houston', 'austin', 'usa', 'nationwide'],
    response: "We serve all major Texas cities and the entire United States. Because all sessions are online, location is never a barrier."
  },
  {
    name: 'contact',
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'talk to someone', 'consultation', 'schedule'],
    response: "📞 Call: 817-908-4070\n📧 Email: rex@valormediation.com\nWe offer free consultations – just call or email to schedule!"
  },
  {
    name: 'benefits',
    keywords: ['benefits', 'advantages', 'why choose', 'better than court', 'pros'],
    response: "**Benefits of Mediation:**\n✅ Cost-effective\n✅ Faster resolution\n✅ Confidential\n✅ You control the outcome\n✅ Preserves relationships\n✅ Less stress\n✅ Legally binding agreements"
  },
  {
    name: 'about',
    keywords: ['about', 'who are you', 'company', 'firm', 'rex steele', 'mediator', 'experience'],
    response: "Valor Mediation, LLC is led by Rex Steele, a certified mediator and Navy veteran with decades of business and conflict resolution experience. We focus exclusively on mediation to ensure neutrality."
  }
];

const defaultResponse = "I'm sorry, I didn't quite understand. You can ask about our services, costs, process, locations, or contact information. If you'd like to speak with a person, call 817-908-4070 or email rex@valormediation.com.";

exports.getResponse = async (message) => {
  const msg = message.trim();
  if (!msg) return defaultResponse;

  let bestIntent = null;
  let bestScore = 0;
  for (const intent of intents) {
    const score = scoreIntent(msg, intent.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent && bestScore > 0) {
    return bestIntent.response;
  }
  return defaultResponse;
};