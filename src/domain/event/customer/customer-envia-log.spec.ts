
import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe("Envia Console Log Create Event Tests", () => {


    it("Should log a message when two consoles.log when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        // Cria dois manipuladores de evento
        // que irão registrar mensagens no console quando o evento for disparado
        // O primeiro irá registrar "Esse é o primeiro console.log do evento: CustomerCreatedEvent"
        // O segundo irá registrar "Esse é o segundo console.log do evento: CustomerCreatedEvent"
        const eventHandler = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        // Registra os 2 manipuladores de evento no EventDispatcher
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        // Cria um espião (spy) para o manipulador de evento
        // e um espião para o console.log
        // O espião irá verificar se o manipulador de evento foi chamado corretamente
        const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();


        // Cria um evento de cliente criado
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Paulo Oliveira"
        });

        // Notifica o EventDispatcher com o evento de cliente criado
        // O EventDispatcher irá chamar os manipuladores de evento registrados
        eventDispatcher.notify(customerCreatedEvent);

        // Verifica se o manipulador de evento foi chamado
        expect(eventHandlerSpy).toHaveBeenCalled();
        expect(eventHandlerSpy).toHaveBeenCalledWith(customerCreatedEvent);

        // Verifica se o console.log foi chamado com as mensagens corretas
        expect(consoleSpy).toHaveBeenCalledWith(
            `Esse é o primeiro console.log do evento: CustomerCreatedEvent`
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            `Esse é o segundo console.log do evento: CustomerCreatedEvent`
        );

    });

    it("Should log a message when Client Adress is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        
        const newAddress = new Address("Rua 1", 123, "São Paulo", "12345-678");

        const event = new CustomerAddressChangedEvent({
            id: "1",
            nome: "Paulo Oliveira",
            address: newAddress
        });
        
        eventDispatcher.notify(event);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledWith(event);

        expect(consoleSpy).toHaveBeenCalledWith(
            `Endereço do cliente: 1, Paulo Oliveira alterado para: ${newAddress.street}, ${newAddress.number} - ${newAddress.zipCode} - ${newAddress.city}`
        );
    });
});

