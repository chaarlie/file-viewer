
# Hi there

This is a web app to convert documents to images (PNGs). As of now, only PDF files allowed. The project is comprised of multiple docker services, simultaneously working together through docker compose.

When the Home component first loads it shows the app layout and attempts to fetch the available stored documents at ``curl -X GET http://localhost:5005/ `` . The document pages are using an incremental name nomenclature exposed through the ``static`` path i.e. if the file name is "my pdf.pdf" and has 3 pages, the available images would be located at :

1. http://localhost:5005/static/my_pdf.1.png 
2. http://localhost:5005/static/my_pdf.2.png
3. http://localhost:5005/static/my_pdf.3.png

The primary reason to use docker compose was to properly have **graphicsmagick** working through different environments.


## Technology used

**Backend**: Node.js, Typescript, TypeORM, PostgreSQL. <br>
**Frontend**: Next.js + SSR,  Typescript, TailwindCSS, CSS Grid, FlexBox, Jest, RTL.

## Instructions to RUN

1. Edit the **env.example** file accordingly
2. Move to **./server** and run ``npm install``
3. Modify **next.config.js** hostname and port to match with **.env**  SERVER_DOCKER_HOST and SERVER_PORT variables
4. Move to root directory and do ``docker compose up``

## Instructions to Test

1. Move to the **client** directory
2. Edit **.env.test** and run ``npm install``
3. Run ``npm test``

