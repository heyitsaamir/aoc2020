import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

interface Input {
  passports: Passport[];
}

/*
byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)
*/
interface Passport {
  requiredFieldCount: number;
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

export class DaySolution implements Solution {
  parse(input: string): Input {
    const passportLines = input.split("\n\n");
    const passports = passportLines.map((p) => {
      const pString = p.replace(/\n/g, " ");
      const tokens = pString.split(" ");
      return tokens.reduce(
        (passport, token) => {
          const [type, value] = token.split(":");
          switch (type) {
            case "byr":
              passport.byr = value;
              if (
                !isNaN(parseInt(value)) &&
                parseInt(value) >= 1920 &&
                parseInt(value) <= 2002
              ) {
                passport.requiredFieldCount++;
              }
              break;
            case "iyr":
              passport.iyr = value;
              if (
                !isNaN(parseInt(value)) &&
                parseInt(value) >= 2010 &&
                parseInt(value) <= 2020
              ) {
                passport.requiredFieldCount++;
              }
              break;
            case "eyr":
              passport.eyr = value;
              if (
                !isNaN(parseInt(value)) &&
                parseInt(value) >= 2020 &&
                parseInt(value) <= 2030
              ) {
                passport.requiredFieldCount++;
              }
              break;
            case "hgt":
              passport.hgt = value;
              if (value.length >= 3) {
                const number = parseInt(value.substr(0, value.length - 2));
                if (
                  !isNaN(number) &&
                  value.substr(value.length - 2) === "cm" &&
                  number >= 150 &&
                  number <= 193
                ) {
                  passport.requiredFieldCount++;
                } else if (
                  !isNaN(number) &&
                  value.substr(value.length - 2) === "in" &&
                  number >= 59 &&
                  number <= 76
                ) {
                  passport.requiredFieldCount++;
                }
              }
              break;
            case "hcl":
              passport.hcl = value;
              if (
                value.length === 7 &&
                value.charAt(0) === "#" &&
                value
                  .substr(1)
                  .split("")
                  .every(
                    (c) =>
                      (c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 57) ||
                      (c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 102)
                  )
              )
                passport.requiredFieldCount++;
              break;
            case "ecl":
              passport.ecl = value;
              if (
                ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(
                  (tst) => tst === value
                )
              ) {
                passport.requiredFieldCount++;
              }
              break;
            case "pid":
              passport.pid = value;
              if (!isNaN(parseInt(value)) && value.length === 9) {
                passport.requiredFieldCount++;
              }
              break;
            case "cid":
              passport.cid = value;
              break;
          }
          return passport;
        },
        { requiredFieldCount: 0 } as Passport
      );
    });
    return {
      passports,
    };
  }

  getValidPassports(input: Input) {
    return input.passports.filter((p) => p.requiredFieldCount === 7).length;
  }

  async run() {
    const data = readInput("./inputs/d4.txt");
    const input = this.parse(data);
    const validPassportCount = this.getValidPassports(input);
    return validPassportCount.toString();
  }
}
