import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <section className="mx-auto my-8 max-w-6xl px-6">
        <Outlet />
      </section>
    </>
  );
}

export default MainLayout;
