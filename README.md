# Flowee Streaming Service

Flowee is an open-source streaming service designed to help users stream their media

## Self-hosted

1. Clone the Repository

```bash
git clone https://github.com/flowee-stream/flowee
cd flowee
```

2. Customize the environment variables

Flowee requires the following environment variables to function properly. Please copy the example.env file to .env and update the values according to your needs.

```bash
cp example.env .env
nano .env
```

Variable | Description | Example
--- | --- | ---
NEXT_PUBLIC_API_HOST | The API endpoint | http://localhost:3000/api
MONGO_URL | The URL of the MongoDB server. | mongodb://localhost:27017/
MONGO_DB | The name of the MongoDB database used by Flowee. | flowee

3. Install Dependencies

Use npm to install the required dependencies.

```bash
npm i
```

4. Build the Application

Compile the application with the following command.

```bash
npm run build
```

5. Start the Application

Launch the application with the following command.

```bash
npm run start
```

The Flowee streaming service is now running on your machine. Please visit http://localhost:3000 to access the application. 

If you are using a hosting service, please make sure to configure the appropriate ports and environment variables for your production environment.


## Contributing

Flowee is an open-source project, and we welcome contributions from developers worldwide. To contribute:

1. Fork this repository
2. Create a new branch (e.g., feature/my-feature-name)
3. Make your changes
4. Commit your changes
5. Push your changes to your fork
6. Submit a Pull Request

## License

Flowee is released under the [MIT License](https://opensource.org/licenses/MIT). 
We encourage everyone to use, modify, and distribute Flowee freely. 
