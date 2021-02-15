const { device, constants } = require('luxafor-api');
const psList = require('ps-list');
const activeWin = require('active-win');

const luxafor = device();


async function getCurrentWindow()
{
    var currentWindow = await activeWin();
    return currentWindow;
}

setInterval(async () =>
{
    try
    {
        var currentWindow = await activeWin();
        const importantApps = ["phpstorm", "code", "terminal", "google chrome", "tableplus"];

        if (importantApps.includes(currentWindow.owner.name.toLowerCase()))
        {
            luxafor.color("red");
            if (currentWindow.owner.name.toLowerCase() === 'google chrome')
            {
                const importantUrls = [
                    "[a-z]*.housingapps.sa",
                    "https://www.drupal.org/project/[a-z _]*",
                    "https://devops.housing.sa:8083/[a-z]*"
                ];

                isImportant = false;
                for (var i = 0; i < importantUrls.length; i++)
                {
                    if (currentWindow.url.search(importantUrls[i]) !== -1)
                    {
                        isImportant = true;
                    }
                }

                console.log("is url an important one? \n" + isImportant);
                if (isImportant)
                {
                    luxafor.color("off");
                    luxafor.flash("yellow");
                } else
                {
                    luxafor.color("green");
                }
            }
        } else
        {
            luxafor.color("green");
        }
    } catch (e)
    {
        continue;
    }
}, 1000);
