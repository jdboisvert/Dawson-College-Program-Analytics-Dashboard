import requests
from bs4 import BeautifulSoup
from dateutil import parser 
import json

# Parse a single Program page at Dawson College
def parseProgramPage(url):
    
    #This is just to make it so the request goes through and the Dawson website does not decline it 
    headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'referrer': 'https://google.com'
    }
    
    # URL of program page for pure and applied
    r = requests.get(url, headers=headers)
    
    if (r.status_code == requests.codes.ok):
    
        # Get HTML of the page
        html = r.text.strip()

        # Make html of page a BeautifulSoup 
        soup = BeautifulSoup(html, 'lxml')
    
        programDateMod = getDateOfMods(soup)
    
        #Page data to be returned
        pageData = {
            'date': programDateMod
        }
    
        return pageData
    else: 
        return '404'

#Get the date of when the page was last modified
def getDateOfMods(soup):
    # Get when last modified
    dateModified = soup.find(class_='page-mod-date').contents[0].strip()
    # Remove the 'Last Modified: ' field so just date is left
    dateModified = dateModified[15:]
    return dateModified
    

#Gets all the programs on the Dawson page
def getPrograms(url):
        # An array to hold all the programs retrieved
        programs = []
        #This is just to make it so the request goes through and the Dawson website does not decline it 
        headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        'referrer': 'https://google.com'
        }
    
        # URL of program page for pure and applied
        r = requests.get(url, headers=headers)
    
        # Get HTML of the page
        html = r.text.strip()
    
        # Make html of page a BeautifulSoup 
        soup = BeautifulSoup(html, 'lxml')
    
        content = soup.find(class_='entry-content')
    
        #Get all the rows
        trTags = content.find_all('tr')
    
        #Loop through each row
        for tr in trTags:
        
            #Means a program continue (not a heading)
            if(tr.find(class_='program-name')):
                #Get program url 
                programUrlEnd = tr.find(class_='program-name').find('a')['href']
                #Not an actual program 
                if programUrlEnd == '/programs/general-education':
                    continue
                programUrl = 'https://www.dawsoncollege.qc.ca/' + programUrlEnd
                #Get page info
                pageInfo = parseProgramPage(programUrl)
                #Add program type
                #If 404 means page was not found so skip
                if (pageInfo == '404'):
                   continue
                if tr.find(class_='program-type'):
                    try:
                        pageInfo['type'] = tr.find(class_='program-type').contents[0].strip()
                    #Since not a program and details are not present just continue
                    except: 
                        continue
                    pageInfo['programName'] = tr.find(class_='program-name').find('a').contents[0].strip()
                    programs.append(pageInfo)
                print(pageInfo)
        print('Finished extracting')
        return programs

with open('data/dawson_data.json', 'w') as f:
    json.dump(programs, f)






if __name__ == "__main__":

    