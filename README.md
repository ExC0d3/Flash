# Flash

Flash is a helpful script to clear your torrent directories of junks. 
It is named flash because I got the idea for it while watching Flash.
It parses your torrent directory and searches for files that you want
to ideally remove. Then it picks those files and places them in a 
```dump``` folder in the root of your torrent directory.
You can do whatever you want to with that folder.

It reads your configuration from a ```config.json``` file 
which has the following structure

```javascript
    {
        include:[".mp3",".txt",".nfo"],
        exclude:[".mp4",".mkv",".avi"],
        size:23
    }
```
* ```include``` array specifies the file extensions to be included while parsing the 
directory.

* ```exclude``` specifies the file extensions that should not be touched. Safety measure

* ```size``` A parameter to parse directory based on file size. This is an upper limit parameter(Will be used later to add more functionality)

# TODO

* Make error logs more user friendly
* Implement safety measure using `exclude ` values 