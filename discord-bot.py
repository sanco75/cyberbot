import discord
import datetime
from discord.ext import commands
from checkout import price,model,img

client = commands.Bot(command_prefix='/')

@client.event
async def on_ready():
    print("Bot is ready.")

@client.command()
async def ping(ctx):
    await ctx.send(f"Pong! {round(client.latency * 1000)}ms")

@client.command()
async def buy(ctx):
    exec(open("checkout.py").read())

@client.command()
async def success(ctx):
    embedVar = discord.Embed(title="*SUCCESFULLY CHECKED OUT!*", color=0x1771a6)
    embedVar.set_thumbnail(url=img)
    embedVar.add_field(name="Shop", value="**https://www.amd.com/de/direct-buy/5450881600/de**", inline=True)
    embedVar.add_field(name="Price", value=price, inline=False)
    embedVar.add_field(name="Brand", value="AMD", inline=True)
    embedVar.add_field(name="Model", value=model, inline=True)
    embedVar.set_footer(text="CyberBot™ 2021 - v.1.0", icon_url="http://pngimg.com/uploads/lightning/lightning_PNG41.png")
    await ctx.send(embed=embedVar)

client.run('ODM1NTYzMTA4OTM5NTk1ODY5.YIRQyQ.Ewnz7LSgHmAgLllMnaKBVTGqcTs')