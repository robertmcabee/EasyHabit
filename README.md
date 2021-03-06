# EasyHabit

A straightforward habit tracker built with React. You can log-in to carry your progress across all your devices, if you'd like.

**Live Website:** https://easyhabit.vercel.app/
![EasyHabit Screenshot](https://imgur.com/M1SkVep.png)

## How It's Made:

**Tech used:** React, TypeScript, Next.js, Supabase, TailwindCSS, HTML, Date-FNS

Easyhabit uses browser local storage to carry over data between visits. It also uses the Date-FNS library to handle everything date-related, because dates can be a headache in JavaScript.

The backend is all handled with Supabase, a PostgreSQL BaaS. I was really happy with how easy it made auth and storage.

## Lessons Learned:

This was a really fun project. This is the most ambitious project I've built thus far, so there were some challenges, particularly choosing good variable names, and structuring data in a way that makes works well at scale. Good comments have been invaluable over the course of development.

Making everything look good with one habit or eight on both mobile and desktop was an interesting design challenge - I spent a lot of time with it, and I'm happy with the result.

_If you find any bugs or would like to see any features added, please let me know! (Issues / PRs are also welcome.)_
