
# This file is a workaround for an issue related to Prisma migrate:
#   The docker-compose.yml file defines the database and API server as separate services.
#   The API server needs to run a Prisma schema migration command to ensure the tables are
#   created and up to date in the database. It'll fail if the database server isn't up by 
#   the time you run that command.
#   Docker-Compose can guarantee that the database container is spun up *before* the API
#   server does, however this doesn't guarantee that the database server is ready to accept
#   new connections by the time the schema migration command is run. This shell script
#   forces a number of retries with a delay between each attempt to allow for the database
#   server to become ready for new connections.
# Source: https://github.com/prisma/prisma/issues/4728

retries=10
i=$retries
while test $i -gt 0; do
    echo " > Trying Prisma database migration (attempt #$i)..."
    # This is currently not using the production Prisma migration command. See: https://www.prisma.io/docs/concepts/components/prisma-migrate#production-and-testing-environments
    if npx prisma migrate dev --name init > /dev/null 2> /dev/null; then
        echo " > Successfully migrated!"
        exit 0
    else 
        echo " > Failed to migrate..."
    fi
    i=$(expr $i - 1)
    sleep 1
done

# echo " > Giving up Prisma migration after $retries retries, exiting with code 1"
exit 1
