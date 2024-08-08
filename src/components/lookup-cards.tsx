"use client";

import {
  Card,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Hand as HandIcon,
  Pin as MapPinIcon,
  PhoneCall as PhoneIcon,
  BookOpen as BookIcon,
  Signature as SignatureIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Content of the card that is shown when a card is clicked
const Content = ({ student }) => (
  <motion.div className="flex justify-between space-x-4">
    <Avatar>
      <AvatarFallback>
        {student.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
    <motion.div className="space-y-1">
      <motion.h4 className="text-sm font-semibold">{student.name}</motion.h4>
      <motion.p className="text-sm">{student.email}</motion.p>
      <motion.div className="flex items-center pt-2">
        <HandIcon className="mr-2 h-4 w-4 opacity-70" />
        <motion.span className="text-xs">{student.skills}</motion.span>
      </motion.div>
      <motion.div className="flex items-center pt-2">
        <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
        <motion.span className="text-xs">{student.location}</motion.span>
      </motion.div>
      <motion.div className="flex items-center pt-2">
        <PhoneIcon className="mr-2 h-4 w-4 opacity-70" />
        <motion.span className="text-xs">{student.phone}</motion.span>
      </motion.div>
      <motion.div className="flex items-center pt-2">
        <BookIcon className="mr-2 h-4 w-4 opacity-70" />
        <motion.span className="text-xs">{student.course}</motion.span>
      </motion.div>
      <motion.div className="flex items-center pt-2">
        <SignatureIcon className="mr-2 h-4 w-4 opacity-70" />
        <motion.span className="text-xs">{student.year}</motion.span>
      </motion.div>
    </motion.div>
  </motion.div>
);

// Structure of Cards that are shown in the lookup page
const StudentCard = ({ student, layout }) => {
  return (
    <Card
      className={`rounded-lg shadow-md hover:shadow-lg hover:border-primary flex ${layout === "grid" ? "flex-col" : "flex-row justify-between items-center"}`}
    >
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
        <CardDescription>{student.email}</CardDescription>
      </CardHeader>
      <CardFooter className="text-sm flex gap-4 justify-between">
        <div className="flex flex-wrap gap-1">
          {student.skills.map((skill, index) => (
            <Badge key={index}>{skill}</Badge>
          ))}
        </div>
        <p>Year: {student.year}</p>
      </CardFooter>
    </Card>
  );
};

type LookupCardsProps = {
  cards: {
    name: string;
    email: string;
    skills: string[];
    phone: string;
    location: string;
    description: string;
    title: string;
    src: string;
    year: number;
  }[];
  layout: "grid" | "list";
};

export default function LookupCards({ cards, layout }: LookupCardsProps) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* BUG: Close button not shown*/}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div className="flex justify-between items-start p-4">
                <Content student={active} />

                <motion.a
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  href={active.src}
                  target="_blank"
                  className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                >
                  view
                </motion.a>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Mapping cards*/}
      <ul
        className={`mx-auto w-full gap-4 ${layout === "list" ? "flex flex-col" : "grid sm:grid-cols-2 lg:grid-cols-3"}`}
      >
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
          >
            <StudentCard student={card} layout={layout} />
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
