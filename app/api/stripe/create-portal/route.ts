import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { createCustomerPortal } from "@/libs/stripe";
import userClient from "@/libs/drizzle/queries/user";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      // await connectMongo();

      const body = await req.json();
      //
      // const { id } = session.user;
      // console.log('User id:', id);
      // const user = await User.findById(id);

      const user = await userClient
          .query
          .get
          .me(session);

      console.log('User:', user)

      if (!user?.customerId) {
        return NextResponse.json(
          {
            error:
              "You don't have a billing account yet. Make a purchase first.",
          },
          { status: 400 }
        );
      } else if (!body.returnUrl) {
        return NextResponse.json(
          { error: "Return URL is required" },
          { status: 400 }
        );
      }

      const stripePortalUrl = await createCustomerPortal({
        customerId: user.customerId,
        returnUrl: body.returnUrl,
      });

      return NextResponse.json({
        url: stripePortalUrl,
      });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: e?.message }, { status: 500 });
    }
  } else {
    // Not Signed in
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}
