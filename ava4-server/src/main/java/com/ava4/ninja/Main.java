package com.ava4.ninja;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;

public class Main {

    public static void main( String[] args ) {

        // Server and context
        Server server = new Server(9999);
        ServletContextHandler contextHandler = new ServletContextHandler();
        contextHandler.setContextPath("/");


        ResourceConfig resourceConfig = new ResourceConfig();
        resourceConfig.packages(true, "com.ava4.ninja.resource");
        resourceConfig.register(new JacksonJaxbJsonProvider());

        contextHandler.addServlet(new ServletHolder(new ServletContainer(resourceConfig)), "/res/*");

        server.setHandler(contextHandler);
        try {
            server.start();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
