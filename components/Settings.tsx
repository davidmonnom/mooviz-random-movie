"use client";

import { MoovizContext } from "@/app/context";
import {
  ActionIcon,
  Box,
  Drawer,
  MultiSelect,
  RangeSlider,
  Select,
  Slider,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { PiGearFill } from "react-icons/pi";
import { countryCode } from "@/utils/countryCode";
import "../styles/settings.scss";

const availableLanguages = [
  { value: "en-US", label: "English" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
];

export default function Settings() {
  const context = useContext(MoovizContext);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon
        onClick={open}
        variant="gradient"
        size={"lg"}
        aria-label="Gradient action icon"
        gradient={{ from: "yellow", to: "orange", deg: 143 }}
      >
        <PiGearFill />
      </ActionIcon>

      <Drawer
        opened={opened}
        onClose={close}
        title="Settings"
        style={{ color: "black" }}
      >
        <MultiSelect
          mt={"sm"}
          label="Genres"
          placeholder="Select genre"
          data={context.availableGenres.map((genre) => ({
            value: genre.id.toString(),
            label: genre.name,
          }))}
          value={context.genres}
          onChange={context.setGenres}
        />
        <MultiSelect
          mt={"sm"}
          label="Countries"
          placeholder="Select country"
          data={countryCode}
          value={context.countries}
          onChange={context.setCountries}
        />
        <Select
          mt={"sm"}
          label="Language"
          placeholder="Select language"
          data={availableLanguages}
          value={context.language}
          onChange={context.changeLanguage}
        />
        <Box mt={"sm"}>
          <Text size="sm">Year</Text>
          <RangeSlider
            minRange={1}
            color="orange"
            min={1990}
            max={new Date().getFullYear()}
            step={1}
            value={context.years}
            onChange={context.setYears}
          />
        </Box>
        <Box mt={"sm"}>
          <Text size="sm">Rating</Text>
          <Slider
            label="Rating"
            color="orange"
            min={0}
            max={10}
            value={context.voteAverage}
            onChange={context.setVoteAverage}
          />
        </Box>
      </Drawer>
    </>
  );
}
