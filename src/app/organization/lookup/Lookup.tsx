"use client";

import { Input } from "@/components/ui/input";
import { UserRoundSearch as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { useState } from "react";
import LookupCards from "@/components/lookup-cards";

function Lookup() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("name");

  return (
    <>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4 p-1">
        <div className="relative flex items-center transition-colors duration-300 basis-full md:basis-1/2 lg:basis-1/3">
          <SearchIcon className="absolute left-3 top-2 w-5 h-5" />
          <Input
            type="search"
            placeholder="Search students"
            className="w-full pl-10 pr-4 py-2 border rounded-md transition-colors duration-300"
          />
        </div>
        <div className="basis-full md:basis-auto flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-primary">
              <DropdownMenuLabel>Display layout</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={layout} onValueChange={setLayout}>
                <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Sort order</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="year">Year</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="skill">
                  Skill
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <LookupCards cards={students} layout={layout} />
    </>
  );
}

export default Lookup;

const students = [
  {
    name: "Alice Chen",
    email: "alice@stanford.edu",
    course: "Int M.Sc Computer Science (AI & ML)",
    skills: ["Data Science"],
    languages: ["English", "Mandarin"],
    location: "San Francisco, CA",
    phone: "555-1234",
    year: 5,
    src: "/resume/alice-chen",
  },
  {
    name: "Bob Smith",
    email: "bob@mit.edu",
    course: "Int M.Sc Computer Science (AI & ML)",
    skills: ["Data Science"],
    languages: ["English", "Spanish"],
    location: "Boston, MA",
    phone: "555-5678",
    year: 5,
    src: "/resume/bob-smith",
  },
  {
    name: "Charlie Brown",
    email: "charlie@berkeley.edu",
    course: "Int M.Sc Computer Science (AI & ML)",
    skills: ["UX Design"],
    languages: ["English", "French"],
    location: "Berkeley, CA",
    phone: "555-9012",
    year: 5,
    src: "/resume/charlie-brown",
  },
  {
    name: "Diana Davis",
    email: "diana@harvard.edu",
    course: "Int M.Sc Computer Science (AI & ML)",
    skills: ["Finance", "Marketing"],
    languages: ["English", "German"],
    location: "Cambridge, MA",
    phone: "555-3456",
    year: 5,
    src: "/resume/diana-davis",
  },
  {
    name: "Eve Johnson",
    email: "eve@cmu.edu",
    course: "Int M.Sc Computer Science (AI & ML)",
    skills: ["Cybersecurity", "AI Research"],
    languages: ["English", "Russian"],
    location: "Pittsburgh, PA",
    phone: "555-7890",
    year: 5,
    src: "/resume/eve-johnson",
  },
  {
    name: "Frank Miller",
    email: "frank@yale.edu",
    course: "BCA Computer Science",
    skills: ["HTML", "CSS"],
    languages: ["English", "Mandarin"],
    location: "New Haven, CT",
    phone: "555-2109",
    year: 4,
    src: "/resume/frank-miller",
  },
  {
    name: "Grace Lee",
    email: "grace@ucla.edu",
    course: "BCA Computer Science",
    skills: ["Biomedical Engineering"],
    languages: ["English", "Korean"],
    location: "Los Angeles, CA",
    phone: "555-6543",
    year: 4,
    src: "/resume/grace-lee",
  },
  {
    name: "Henry Wang",
    email: "henry@nyu.edu",
    course: "BCA Computer Science",
    skills: ["Graphic Design"],
    languages: ["English", "Cantonese"],
    location: "New York, NY",
    phone: "555-0987",
    year: 4,
    src: "/resume/henry-wang",
  },
  {
    name: "Ivy Taylor",
    email: "ivy@princeton.edu",
    course: "BCA Computer Science",
    skills: ["Mathematics", "Economics"],
    languages: ["English", "Spanish"],
    location: "Princeton, NJ",
    phone: "555-4321",
    year: 4,
    src: "/resume/ivy-taylor",
  },
  {
    name: "Jack Liu",
    email: "jack@uwaterloo.ca",
    course: "BCA Computer Science",
    skills: ["Flutter", "Firebase"],
    languages: ["English", "Mandarin"],
    location: "Waterloo, ON",
    phone: "555-8765",
    year: 4,
    src: "/resume/jack-liu",
  },
];
