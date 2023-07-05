This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run db seed script:

```bash
npx prisma db seed
```

3. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The bug

1. Scroll rapidly up and down the datagrid. May take a while, if the crash doesn't occur just refresh the page and try again.
![image](https://github.com/martenjurgens/mui-lazy-load-bug/assets/55079581/8cd26edd-5ec3-42a8-957e-5aa5e9518039)




