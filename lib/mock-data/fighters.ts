import { Fighter } from "@/components/ui/fighter-comparison-card";

export const fightersDatabase: Fighter[] = [
  {
    id: 1,
    name: "Alexander Volkanovski",
    nickname: "The Great",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-07/VOLKANOVSKI_ALEXANDER_L_BELT_07-08.png?itok=H3NBqS2E",
    record: "26-3-0",
    weightClass: "Featherweight",
    height: "5'6\"",
    reach: "71\"",
    age: 35,
    stance: "Orthodox",
    winRate: 89,
    recentForm: [
      {
        fight: "vs. Ilia Topuria",
        result: "L",
        method: "KO/TKO",
        round: 2
      },
      {
        fight: "vs. Islam Makhachev",
        result: "L",
        method: "Decision",
        round: 5
      },
      {
        fight: "vs. Max Holloway",
        result: "W",
        method: "Decision",
        round: 5
      }
    ],
    strengths: ["Fight IQ", "Cardio", "Volume Striking", "Adaptability"],
    weaknesses: ["Size", "Power", "Reach"],
    stats: {
      striking: 9,
      grappling: 8,
      cardio: 10,
      power: 7,
      speed: 8,
      defense: 9
    }
  },
  {
    id: 2,
    name: "Islam Makhachev",
    nickname: "The Eagle's Heir",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-10/MAKHACHEV_ISLAM_L_BELT_10-21.png?itok=qzl6Vnmn",
    record: "25-1-0",
    weightClass: "Lightweight",
    height: "5'10\"",
    reach: "70.5\"",
    age: 32,
    stance: "Southpaw",
    winRate: 96,
    recentForm: [
      {
        fight: "vs. Alexander Volkanovski",
        result: "W",
        method: "Decision",
        round: 5
      },
      {
        fight: "vs. Charles Oliveira",
        result: "W",
        method: "Submission",
        round: 2
      },
      {
        fight: "vs. Bobby Green",
        result: "W",
        method: "TKO",
        round: 1
      }
    ],
    strengths: ["Grappling", "Control", "Submissions", "Pressure"],
    weaknesses: ["Striking Variety", "Knockout Power"],
    stats: {
      striking: 7,
      grappling: 10,
      cardio: 9,
      power: 7,
      speed: 8,
      defense: 9
    }
  },
  {
    id: 3,
    name: "Jon Jones",
    nickname: "Bones",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/JONES_JON_L_BELT_03-04.png?itok=P6J6DQpm",
    record: "27-1-0",
    weightClass: "Heavyweight",
    height: "6'4\"",
    reach: "84.5\"",
    age: 36,
    stance: "Orthodox",
    winRate: 96,
    recentForm: [
      {
        fight: "vs. Ciryl Gane",
        result: "W",
        method: "Submission",
        round: 1
      },
      {
        fight: "vs. Dominick Reyes",
        result: "W",
        method: "Decision",
        round: 5
      },
      {
        fight: "vs. Thiago Santos",
        result: "W",
        method: "Decision",
        round: 5
      }
    ],
    strengths: ["Fight IQ", "Creativity", "Reach", "Adaptability"],
    weaknesses: ["Discipline", "Inactivity", "New Weight Class"],
    stats: {
      striking: 9,
      grappling: 9,
      cardio: 8,
      power: 8,
      speed: 8,
      defense: 9
    }
  },
  {
    id: 4,
    name: "Amanda Nunes",
    nickname: "The Lioness",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-06/NUNES_AMANDA_L_BELT_06-10.png?itok=jBmzh-Qs",
    record: "23-5-0",
    weightClass: "Bantamweight",
    height: "5'8\"",
    reach: "69\"",
    age: 35,
    stance: "Orthodox",
    winRate: 82,
    recentForm: [
      {
        fight: "vs. Julianna Peña",
        result: "W",
        method: "Decision",
        round: 5
      },
      {
        fight: "vs. Julianna Peña",
        result: "L",
        method: "Submission",
        round: 2
      },
      {
        fight: "vs. Megan Anderson",
        result: "W",
        method: "Submission",
        round: 1
      }
    ],
    strengths: ["Power", "Striking", "Grappling", "Aggression"],
    weaknesses: ["Age", "Cardio in Later Rounds"],
    stats: {
      striking: 9,
      grappling: 8,
      cardio: 7,
      power: 10,
      speed: 8,
      defense: 8
    }
  },
  {
    id: 5,
    name: "Israel Adesanya",
    nickname: "The Last Stylebender",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-09/ADESANYA_ISRAEL_L_09-09.png?itok=PJtiG0OJ",
    record: "24-3-0",
    weightClass: "Middleweight",
    height: "6'4\"",
    reach: "80\"",
    age: 34,
    stance: "Switch",
    winRate: 89,
    recentForm: [
      {
        fight: "vs. Sean Strickland",
        result: "L",
        method: "Decision",
        round: 5
      },
      {
        fight: "vs. Alex Pereira",
        result: "W",
        method: "KO/TKO",
        round: 2
      },
      {
        fight: "vs. Alex Pereira",
        result: "L",
        method: "TKO",
        round: 5
      }
    ],
    strengths: ["Striking", "Range Control", "Technique", "Fight IQ"],
    weaknesses: ["Takedown Defense", "Grappling"],
    stats: {
      striking: 10,
      grappling: 6,
      cardio: 8,
      power: 8,
      speed: 9,
      defense: 9
    }
  },
  {
    id: 6,
    name: "Weili Zhang",
    nickname: "Magnum",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-08/ZHANG_WEILI_L_BELT_08-19.png?itok=mO9zzQnc",
    record: "24-3-0",
    weightClass: "Strawweight",
    height: "5'4\"",
    reach: "63\"",
    age: 34,
    stance: "Switch",
    winRate: 89,
    recentForm: [
      {
        fight: "vs. Amanda Lemos",
        result: "W",
        method: "Decision",
        round: 5
      },
      {
        fight: "vs. Carla Esparza",
        result: "W",
        method: "Submission",
        round: 2
      },
      {
        fight: "vs. Joanna Jędrzejczyk",
        result: "W",
        method: "KO",
        round: 2
      }
    ],
    strengths: ["Power", "Explosiveness", "Striking", "Athleticism"],
    weaknesses: ["Language Barrier", "Fight IQ"],
    stats: {
      striking: 9,
      grappling: 8,
      cardio: 9,
      power: 10,
      speed: 9,
      defense: 8
    }
  }
];
