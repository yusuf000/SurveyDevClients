// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logos/surveydevs-high-resolution-logo-black-transparent.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Survey Devs",
    image: logoCT,
    route: "/",
  },
  socials: [
    /*{
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/",
    },
    {
      icon: <GitHubIcon />,
      link: "https://github.com/l",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/",
    },*/
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "team", href: "/author" },
      ],
    },
    /*{
      name: "resources",
      items: [
        { name: "illustrations", href: "https://iradesign.io/" },
        { name: "bits & snippets", href: "https://www.creative-tim.com/bits" },
        { name: "affiliate program", href: "https://www.creative-tim.com/affiliates/new" },
      ],
    },*/
    {
      name: "help & support",
      items: [
        { name: "contact us", href: "/contact-us" },
        /*{ name: "knowledge center", href: "https://www.creative-tim.com/knowledge-center" },
        { name: "custom development", href: "https://services.creative-tim.com/" },
        { name: "sponsorships", href: "https://www.creative-tim.com/sponsorships" },*/
      ],
    },
    /*{
      name: "legal",
      items: [
        { name: "terms & conditions", href: "https://www.creative-tim.com/terms" },
        { name: "privacy policy", href: "https://www.creative-tim.com/privacy" },
        { name: "licenses (EULA)", href: "https://www.creative-tim.com/license" },
      ],
    },*/
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} {" "}
      <MKTypography
        component="a"
        href="https://www.surveydevs.com"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Survey Devs
      </MKTypography>
      .
    </MKTypography>
  ),
};
