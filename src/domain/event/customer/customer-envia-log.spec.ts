
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
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();


        // Cria um evento de cliente criado
        const event = new CustomerCreatedEvent({
            id: "1",
            name: "Paulo Oliveira",
            email: "pauloh2004@gmail.com",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Notifica o EventDispatcher com o evento de cliente criado
        // O EventDispatcher irá chamar os manipuladores de evento registrados
        eventDispatcher.notify(event);

        // Verifica se o manipulador de evento foi chamado
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledWith(event);

        // Verifica se o console.log foi chamado com as mensagens corretas
        expect(consoleSpy).toHaveBeenCalledWith(
            `Esse é o primeiro console.log do evento: CustomerCreatedEvent`
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            `Esse é o segundo console.log do evento: CustomerCreatedEvent`
        );

    });

    it("Should log a message when Client Adress is changed", () => {

        const cliente = new Customer("1", "Paulo Oliveira");
        
        const spyEventHandler = jest.spyOn(cliente, "changeAddress");
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        const newAddress = new Address("Rua 1", 123, "São Paulo", "12345-678");

        // Mudando o endereço inicial do cliente
        cliente.changeAddress(newAddress);
        cliente.activate();
        
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledWith(newAddress);

        expect(consoleSpy).toHaveBeenCalledWith(
            `Endereço do cliente: ${cliente.id}, ${cliente.name} alterado para: ${newAddress.street}, ${newAddress.number} - ${newAddress.zipCode} - ${newAddress.city}`
        );

        const newAddress2 = new Address("Rua 2", 12, "São Paulo", "12345-000");
        // Mudando o endereço novamente
        cliente.changeAddress(newAddress2);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledWith(newAddress2);

        expect(consoleSpy).toHaveBeenCalledWith(
            `Endereço do cliente: ${cliente.id}, ${cliente.name} alterado para: ${newAddress.street}, ${newAddress.number} - ${newAddress.zipCode} - ${newAddress.city}`
        );
    });
});

