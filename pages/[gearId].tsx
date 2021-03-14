import { useRouter } from "next/router";
import React from "react";
import AppHead from "../components/common/AppHead";

const GearView = () => {
  const router = useRouter();
  const { gearId } = router.query;

  return (
    <div>
      <AppHead title={gearId as string} />

      <main>
        <div className="p-8text-2xl font-medium text-black">
          gearId: {gearId}
        </div>
      </main>
    </div>
  );
};

export default GearView;
