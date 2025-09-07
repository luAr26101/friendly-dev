import { Outlet } from "react-router";
import Hero from "~/components/Hero";

function HomeLayout() {
  return (
    <>
      <Hero name="Raul" />
      <section className="mx-auto my-8 max-w-6xl px-6">
        <Outlet />
      </section>
    </>
  );
}

export default HomeLayout;
