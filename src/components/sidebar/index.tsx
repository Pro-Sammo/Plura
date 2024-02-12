import { getAuthUserDetails } from "@/lib/queries";
import React from "react";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const index = async ({ type, id }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return null;

  if (!user.Agency) return;

  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency.SubAccount.find((subaccount) => subaccount.id === id);


  const isWhiteLabeledAgency = user.Agency.whiteLabel;
  if (!details) return;

  let sideBarLogo = user.Agency.agencyLogo || "/assets/plura-logo.svg";

  if (!isWhiteLabeledAgency) {
    if (type === 'subaccount') {
      sideBarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo
    }
  }

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
  user.Permissions.find(
    (permission) =>
      permission.subAccountId === subaccount.id && permission.access
  )
)



  return <div>index</div>;
};
