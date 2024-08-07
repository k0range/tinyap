import Elysia from "elysia";
import axios from "axios";

import { PrismaClient, Account } from '@prisma/client'

import { tokenToAccount } from "../utils/TokenToAccount";

const prisma = new PrismaClient()

const UserService = new Elysia()
  .get("/api/me", async ({ jwt, cookie, set }: any) => {
    const { accessToken } = cookie
    if (!accessToken.value) {
      set.status = "Unauthorized"
      return {"message": "Access token is missing"}
    }

    const account = await tokenToAccount(jwt, accessToken.value)
    console.log(account)
    return account.user
  })

  .get("/api/profile", async ({ query }: any) => {
    const user = await prisma.user.findUnique({
      where: {
        acct: query.acct
      }
    })

    if (!user) {
      if (query.acct.split("@")[1] != 'tinyap.instance') { // リモートのユーザー
        const serverDomain = query.acct.split("@")[2]

        const webfinger = await axios.get(`https://${serverDomain}/.well-known/webfinger?resource=acct:${query.acct.substring(1)}`, { headers: { Accept: 'application/activity+json' } })

        const self = webfinger.data.links.find((link: { rel: String }) => link.rel === "self")
        const profile = await axios.get(self.href, { headers: { Accept: 'application/activity+json' } })

        return {
          "id": "aaaa",
          "acct": "@" + profile.data.preferredUsername + "@" + serverDomain,
          "displayName": profile.data.name,
          "bio": profile.data.summary,
          "createdAt": new Date()
        }
      }
    }

    return user
  })

  .post("/api/profile-setting", async ({ jwt, cookie, set, body }: any) => {
    const { accessToken } = cookie
    if (!accessToken.value) {
      set.status = "Unauthorized"
      return {"message": "Access token is missing"}
    }

    const user = (await tokenToAccount(jwt, accessToken.value)).user

    await prisma.user.update({
      "where": {
        "id": user?.id
      },
      "data": {
        "displayName": body.displayName
      }
    })
  })

  .get("/.well-known/webfinger", async ({ query }: any) => {
    const acct = query.resource.replace(/^acct:/, "")

    const user = await prisma.user.findUnique({
      where: {
        acct: "@" + acct
      }
    })
    
    return {
      "subject": "acct:" + acct,
      "links": [
        {
          "rel": "self",
          "type": "application/activity+json",
          "href": "https://tinyap-dev.korange.work/ap/user/" + user?.id
        }
      ]
    }
  })

  .get("/ap/user/:id", async ({ set, params }: any) => {
    set.headers["content-type"] = "application/activity+json; charset=utf-8"
    
    const user = await prisma.user.findUnique({
      where: {
        id: params.id
      }
    })

    return JSON.stringify({
      "@context": [
          "https://www.w3.org/ns/activitystreams",
          "https://w3id.org/security/v1",
          {
              "Key": "sec:Key",
              "manuallyApprovesFollowers": "as:manuallyApprovesFollowers",
              "sensitive": "as:sensitive",
              "Hashtag": "as:Hashtag",
              "quoteUrl": "as:quoteUrl",
              "toot": "http://joinmastodon.org/ns#",
              "Emoji": "toot:Emoji",
              "featured": "toot:featured",
              "discoverable": "toot:discoverable",
              "schema": "http://schema.org#",
              "PropertyValue": "schema:PropertyValue",
              "value": "schema:value",
              "vcard": "http://www.w3.org/2006/vcard/ns#"
          }
      ],
      "type": "Person",
      "id": `https://tinyap-dev.korange.work/ap/user/${params.id}`,
      "inbox": `https://tinyap-dev.korange.work/ap/user/${params.id}/inbox`,
      "outbox": `https://tinyap-dev.korange.work/ap/user/${params.id}/outbox`,
      "followers": `https://tinyap-dev.korange.work/ap/user/${params.id}/followers`,
      "following": `https://tinyap-dev.korange.work/ap/user/${params.id}/following`,
      "featured": `https://tinyap-dev.korange.work/ap/user/${params.id}/collections/featured`,
      "sharedInbox": "https://tinyap-dev.korange.work/inbox",
      "endpoints": {
          "sharedInbox": "https://tinyap-dev.korange.work/inbox"
      },
      "url": `https://tinyap-dev.korange.work/${user?.acct}`,
      "preferredUsername": user?.acct.split("@")[1],
      "name": user?.displayName,
      "summary": user?.bio,
      //"icon": {
      //    "type": "Image",
      //    "url": "https://storage.misskey.systems//447b38f3-2ad5-4f5f-bd9a-8ad0c99bac54.webp",
      //    "sensitive": false,
      //    "name": null
      //},
      "tag": [],
      "manuallyApprovesFollowers": false,
      "discoverable": true,
      "publicKey": {
          "id": `https://tinyap-dev.korange.work/ap/user/${params.id}#main-key`,
          "type": "Key",
          "owner": `https://tinyap-dev.korange.work/ap/user/${params.id}`,
          "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlsWhGIngXaKkIwXAvMst\nQctbgnVqmZFvFjQl2u/oTVWILVdDSO/Hod8Fv766tyCSC2W8zIZKI7avgag8l084\nH8If//d52FfKkCKbC/4V9NXbM/zboPduOf01/S3rLB9UlY61vw4j8f6DYuYAVzrr\ncTJr1iIYzWg+u7VVCFBm4csHv5TVde4GjWbKrVZHtqn0NRyfH/DOA4XKr5OszPqv\nobJLKCjU7QQ6P4Q6IR1hqNU5Sk31JFBGdhwaqXeC4m5PcTi4G9byv6GO4KFMoZ17\n/o3eiHzRzNsp7+V02OsZbKPP5VUb4jksekSLwsNp3TLQBkzgSliwF/AYot/X69cc\nzQIDAQAB\n-----END PUBLIC KEY-----\n"
      }
    })
  })

export default UserService