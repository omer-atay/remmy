export function Footer() {
  return (
    <footer className="flex flex-col gap-2 text-xs text-secondary-plain-weak">
      <div className="flex gap-2 flex-wrap [&>a:hover]:text-secondary-plain-hover [&>a:hover]:underline">
        <a href="https://legal.lemmy.world/tos/">Terms of Service</a>
        <a href="https://legal.lemmy.world/privacy-policy/">Privacy Policy</a>
        <a href="https://legal.lemmy.world/">Legal & Help Center</a>
      </div>
      <span>Remmy, 2026</span>
    </footer>
  );
}
