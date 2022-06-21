import { PrismaClient } from "@prisma/client";

export default function redirectPage() {
  return (
    <div>[shortId]</div>
  )
}

// count number of times a link has been clicked and update the database
export async function rexPage(req, res) {
  const { shortId } = req.params;
  const prisma = new PrismaClient();
  const data = await prisma.link.findOne({
    where: {
      shortId: shortId
    }
  });
  if (data) {
    const { url } = data;
    await prisma.link.update({
      where: {
        shortId: shortId
      },
      data: {
        count: data.count + 1
      }
    });
    console.log(data)
    res.redirect(url);
  } else {
    res.status(404).send("Link not found");
  }
}

export async function getServerSideProps({ params }) {
  const prisma = new PrismaClient();
  const { shortId } = params;

  const data = await prisma.link.findUnique({
    where: { shortUrl : shortId },
    });

    if(!data) {
      return { redirect: { destination: '/' } }
    }
    return {
        redirect: { destination: `https://${data.url}` },
    }
}
