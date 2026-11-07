// Single source for the team shown on the Our Story page (and the founder in the site's JSON-LD).
// Photos: drop a portrait (ideally 4:5, at least 600px wide) into public/images/team/ and set `photo`.
// Until a photo is set, the person's initials are shown instead.

export type TeamMember = {
  name: string;
  role: string;
  photo?: string;
  // Listed as founder in the Organization structured data
  founder?: boolean;
};

// Shown large, above the rest of the team
export const TEAM_LEAD: TeamMember & { note: string } = {
  name: "Pratibha",
  role: "Managing Director",
  photo: "/images/pratibha2.png",
  note: "Pratibha runs Mohak day to day, from choosing each collection to making sure every order leaves the way it should.",
};

// Shown in this order in the small grid
export const TEAM: TeamMember[] = [
  { name: "Ashi Singh", role: "Co-Founder", founder: true },
  { name: "Puneet Kumar", role: "Co-Founder", founder: true },
  { name: "Ritu Chaudhary", role: "Lead Designer" },
  { name: "Shekhar Sharma", role: "Head of Operations" },
  { name: "Akanksha Singh", role: "Finance & Compliance" },
  { name: "Madhu Prabha", role: "Brand & Marketing Lead" },
  { name: "Astha Tripathi", role: "Brand Ambassador" },
];

export const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
